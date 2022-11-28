import { ethers, network } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { addOrReplaceFacets } from "../utils/diamond";
import { DexManagerFacet } from "../typechain";
import config from "../config/dexs";
import allowedFuncSignatures from "../config/dexfuncs";
import { verifyContract } from "./9999_verify_all_facets";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("DexManagerFacet", {
    from: deployer,
    log: true,
  });

  const dexManagerFacet = await ethers.getContract("DexManagerFacet");

  const diamond = await ethers.getContract("KanaDiamond");

  await addOrReplaceFacets([dexManagerFacet], diamond.address);

  const dexs = config[network.name].map((d: string) => d.toLowerCase());

  console.log("dexs",dexs)
  if (dexs && dexs.length) {
    console.log("Checking DEXs whitelist...");

    const dexMgr = <DexManagerFacet>(
      await ethers.getContractAt("DexManagerFacet", diamond.address)
    );

    const approvedDEXs = (await dexMgr.approvedDexs()).map((d: string) =>
      d.toLowerCase()
    );

    let tx;

    if (JSON.stringify(approvedDEXs) === JSON.stringify(dexs)) {
      console.log("DEXs already whitelisted.");
    } else {
      console.log(approvedDEXs)
      console.log(dexs)
      console.log("Updating DEX whitelist...");
      tx = await dexMgr.batchAddDex(dexs);
      await tx.wait();
    }

    console.log("approvedDEXs", JSON.stringify(approvedDEXs));

    // Approve function signatures
    console.log("Checking DEXs signatures whitelist...");

    let functionsApproved: any[] = [];
    try {
      functionsApproved = await Promise.all(
        allowedFuncSignatures.map((signature) => {
          return dexMgr.isFunctionApproved(signature);
        })
      );

      console.log("approvedfunctions: " + functionsApproved);

      const allApproved = functionsApproved.reduce(
        (prev, curr) => prev && curr,
        true
      );

      console.log("allApproved: " + allApproved);
      if (allApproved) {
        console.log("DEX signatures already whitelisted.");
      } else {
        console.log("Updating DEX signatures...");
        tx = await dexMgr.batchSetFunctionApprovalBySignature(
          allowedFuncSignatures,
          true
        );
        await tx.wait();
      }

      console.log("Done!");
    } catch (err) {
      console.log(err);
    }

    await verifyContract(hre, "DexManagerFacet", {
      address: dexManagerFacet.address,
    });

    
  }
};

export default func;
func.id = "deploy_dex_manager_facet";
func.tags = ["DeployDexManagerFacet"];
func.dependencies = ["InitialFacets", "KanaDiamond", "InitFacets"];

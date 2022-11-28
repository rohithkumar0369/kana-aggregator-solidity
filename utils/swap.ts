import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { constants, Contract, utils, providers } from "ethers";
import { deployments, ethers, network } from "hardhat";
import {
  DexManagerFacet,
  IERC20__factory as ERC20__factory,
  GenericSwapFacet,
} from "../typechain";
import { node_url } from "../utils/network";
import approvedFunctionSelectors from "../utils/approvedFunctions";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const WNEON = "0xf1041596da0499c3438e3b1eb7b95354c6aed1f5";
const MORA_ADDRESS = "0x6Ab1F83c0429A1322D7ECDFdDf54CE6D179d911f";
const mUSDC_ADDRESS = "0x7ff459ce3092e8a866aa06da88d291e2e31230c1";
const MORASWAP_ADDRESS = "0x696d73D7262223724d60B2ce9d6e20fc31DfC56B";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const USDC = "0x8a56fa4d0768c5f15c88e40d4256f41819abad56";

export async function swapTest() {
  let dexMgr: DexManagerFacet;
  let bob: SignerWithAddress;
  let Kana: GenericSwapFacet;

  const diamond = await ethers.getContract("KanaDiamond");
  const genericFacet = await ethers.getContract("GenericSwapFacet")
  Kana = <GenericSwapFacet>(
    await ethers.getContractAt("GenericSwapFacet", diamond.address)
  );

  dexMgr = <DexManagerFacet>(
    await ethers.getContractAt("DexManagerFacet", diamond.address)
  );

  //@ts-ignore
  bob = await ethers.getSigner("0xdB4daC486137259a899FcA5d7Cb8fB28E2F27Fc5");

  const amountIn = utils.parseUnits("1", 6);
  const amountOut = utils.parseUnits("1", 6);

  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

  const moraswap = new Contract(MORASWAP_ADDRESS, [
    "function swap(uint8,uint8,uint256,uint256,uint256) external payable returns (uint256)",
  ]);

  // Generate swap calldata
  const swapData = await moraswap.populateTransaction.swap(
    0,
    1,
    amountIn,
    amountOut,
    deadline
  );

  console.log(swapData);

  // let provider =  ethers.getDefaultProvider()

  const rpcUrl = "https://proxy.devnet.neonlabs.org/solana";

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  let gasPrice = await provider.getGasPrice();
  let nonce = await provider.getTransactionCount(bob.address);

  const token = ERC20__factory.connect(MORA_ADDRESS, bob);
  await token.approve(genericFacet.address, amountIn, {
    nonce: nonce,
    gasLimit: 2000000,
    gasPrice: gasPrice,
  });

  const postToken = ERC20__factory.connect(WNEON, bob);

  const preBalance = await postToken.balanceOf(bob.address);

  console.log(preBalance);

  nonce = await provider.getTransactionCount(bob.address);

  console.log(gasPrice);
  //  nonce = await provider.getTransactionCount(bob.address)
  try {
    // let res = await Kana.connect(bob).swapTokensGeneric2(
    //   100000,
    //   {
    //     nonce:nonce,
    //     gasLimit: 20000000,
    //     gasPrice: gasPrice,
    //   }
    // )

    console.log(utils.parseUnits("10", 6).toNumber())
    // let reciept = await res.wait()
    // console.log(reciept)

    // console.log(reciept.events)

    let res = await Kana.connect(bob).swapTokensGeneric(
      utils.randomBytes(32),
      "Moraswap",
      ZERO_ADDRESS,
      bob.address,
      utils.parseUnits("10", 6),
      [
        {
          callTo: <string>swapData.to,
          approveTo: <string>swapData.to,
          sendingAssetId: MORA_ADDRESS,
          receivingAssetId: WNEON,
          callData: <string>swapData?.data,
          fromAmount: amountIn,
          requiresDeposit: true,
        },
      ],
      {
        nonce: nonce,
        gasLimit: 5000000,
        gasPrice: gasPrice,
      }
    );

    console.log(res)
    console.log(await res.wait())
  } catch (err) {
    console.log(err);
  }
}

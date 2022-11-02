import { ethers } from "hardhat";

async function main() {

   const [owner, otherAccount] = await ethers.getSigners();
   
   console.log(await owner.getBalance())

  const DiamondCutFacetContract = await ethers.getContractFactory("DiamondCutFacet");

   const DiamondCutFacet = await DiamondCutFacetContract.deploy();

   await DiamondCutFacet.deployed();

   console.log(`DiamondCutFacet Contract deployed to ${DiamondCutFacet.address}`);

   console.log(await owner.getBalance())
   
   const DiamondLoupeFacetContract = await ethers.getContractFactory("DiamondLoupeFacet")

   const DiamondLoupeFacet = await DiamondLoupeFacetContract.deploy()

   await DiamondLoupeFacet.deployed()

   console.log(`DiamondLoupeFacet contract deployed to ${DiamondLoupeFacet.address}`);

   const OwnershipFacetContract = await ethers.getContractFactory("OwnershipFacet")

   const OwnershipFacet = await OwnershipFacetContract.deploy()

   await OwnershipFacet.deployed()

   console.log(`DiamondLoupeFacet contract deployed to ${OwnershipFacet.address}`);

   const KanaDiamondContract = await ethers.getContractFactory("KanaDiamond")

  

   const kanaDiamond = await KanaDiamondContract.deploy(owner.address,DiamondCutFacet.address)

   await kanaDiamond.deployed()
   
   console.log(`KanaDiamond contract deployed to ${kanaDiamond.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

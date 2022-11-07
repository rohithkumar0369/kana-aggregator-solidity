import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer, tokenOwner} = await getNamedAccounts();

  // console.log(deployer)

  const diamondCutFacet = await deploy('DiamondCutFacet', {
    from: deployer,
    log: true,
  })

  const diamondLoupeFacet = await deploy('DiamondLoupeFacet', {
    from: deployer,
    log: true,
  })

  const ownershipFacet = await deploy('OwnershipFacet', {
    from: deployer,
    log: true,
    // deterministicDeployment: true,
  })

  const DimondfacetAddress = await ethers.getContract('DiamondCutFacet')
  console.log("dimaond address",DimondfacetAddress.address)
  
};
export default func;
func.id = 'deploy_initial_facets'
func.tags = ['InitialFacets'];

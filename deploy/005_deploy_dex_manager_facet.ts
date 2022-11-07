import { ethers, network } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { addOrReplaceFacets } from '../utils/diamond'
import { DexManagerFacet } from '../typechain'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

    const { deployments, getNamedAccounts } = hre
    const { deploy } = deployments
  
    const { deployer } = await getNamedAccounts()
  
    await deploy('DexManagerFacet', {
      from: deployer,
      log: true
    })

    const dexManagerFacet = await ethers.getContract('DexManagerFacet')

    const diamond = await ethers.getContract('KanaDiamond')
  
    await addOrReplaceFacets([dexManagerFacet], diamond.address)
    
}

export default func
func.id = 'deploy_dex_manager_facet'
func.tags = ['DeployDexManagerFacet']
func.dependencies = ['InitialFacets', 'KanaDiamond', 'InitFacets']

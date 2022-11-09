import { ethers } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { addOrReplaceFacets } from '../utils/diamond'
import { verifyContract } from './9999_verify_all_facets'
import { swapTest} from "../utils/swap"
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre
    const { deploy } = deployments
  
    const { deployer } = await getNamedAccounts()
     
    await deploy('GenericSwapFacet', {
        from: deployer,
        log: true,
      })
    
      const genericSwapFacet = await ethers.getContract('GenericSwapFacet')
    
      const diamond = await ethers.getContract('KanaDiamond')
    
      await addOrReplaceFacets([genericSwapFacet], diamond.address)

      // const facet = await ethers.getContractAt('GenericSwapFacet',diamond.address)

      await verifyContract(hre, 'GenericSwapFacet', {
        address: genericSwapFacet.address,
      })

      await swapTest()
      // console.log(facet.address)
}

export default func

func.id = 'deploy_generic_swap_facet'
func.tags = ['DeployGenericSwapFacet']
func.dependencies = [
  'InitialFacets',
  'KanaDiamond',
  'InitFacets',
  'DeployDexManagerFacet',
]
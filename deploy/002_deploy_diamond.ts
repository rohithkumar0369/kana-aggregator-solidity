import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { network , ethers} from 'hardhat'
import { verifyContract } from './9999_verify_all_facets'


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, ethers } = hre
    const { deploy } = deployments
  
    const { deployer } = await getNamedAccounts()
  
    const diamondCutFacet = await ethers.getContract('DiamondCutFacet')

    const KanaDiamond = await deploy('KanaDiamond', {
        from: deployer,
        args: [deployer, diamondCutFacet.address],
        log: true,
      })

      await verifyContract(hre, 'KanaDiamond', {
        address: KanaDiamond.address,
        args: [deployer, diamondCutFacet.address],
      })
}

export default func
func.id = 'deploy_Kana_diamond'
func.tags = ['KanaDiamond']
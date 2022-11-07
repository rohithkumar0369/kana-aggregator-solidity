import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { network , ethers} from 'hardhat'


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
}

export default func
func.id = 'deploy_lifi_diamond'
func.tags = ['LiFiDiamond']
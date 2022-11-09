import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address'
import { constants, Contract, utils } from 'ethers'
import { deployments, ethers, network } from 'hardhat'
import {
  DexManagerFacet,
  IERC20__factory as ERC20__factory,
  GenericSwapFacet,
} from '../typechain'
import { node_url } from '../utils/network'
import { expect } from "./chai-setup"
import approvedFunctionSelectors from '../utils/approvedFunctions'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const WNEON = '0xf1041596da0499c3438e3b1eb7b95354c6aed1f5'
const MORA_ADDRESS = '0x6Ab1F83c0429A1322D7ECDFdDf54CE6D179d911f'
const mUSDC_ADDRESS = '0x7ff459CE3092e8A866aA06DA88D291E2E31230C1'
const MORASWAP_ADDRESS = '0x696d73D7262223724d60B2ce9d6e20fc31DfC56B'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
const USDC = "0x8a56fa4d0768c5f15c88e40d4256f41819abad56"
describe('GenericSwapFacet', async () => {
  let dexMgr: DexManagerFacet
  let bob: SignerWithAddress
  let Kana: GenericSwapFacet
  

  const setupTest = deployments.createFixture(
    async ({ deployments, ethers }) => {
      await deployments.fixture('DeployGenericSwapFacet')

      const diamond = await ethers.getContract('KanaDiamond')
      Kana = <GenericSwapFacet>(
        await ethers.getContractAt('GenericSwapFacet', diamond.address)
      )

      dexMgr = <DexManagerFacet>(
        await ethers.getContractAt('DexManagerFacet', diamond.address)
      )
      await dexMgr.addDex(MORASWAP_ADDRESS)
      await dexMgr.batchSetFunctionApprovalBySignature(
        approvedFunctionSelectors,
        true
      )

      // await network.provider.request({
      //   method: 'hardhat_impersonateAccount',
      //   params: ['0xdB4daC486137259a899FcA5d7Cb8fB28E2F27Fc5'],
      // })

      // await network.provider.request({
      //   method: 'hardhat_impersonateAccount',
      //   params: ['0x06959153b974d0d5fdfd87d561db6d8d4fa0bb0b'],
      // })

      //@ts-ignore
      bob = await ethers.getSigner('0xdB4daC486137259a899FcA5d7Cb8fB28E2F27Fc5')
    }
  )


    // bob = await ethers.getSigner('0xDBE3B915A52e30bd6B28aCbc00c53A399e99e5f7')

    beforeEach(async function () {
      // this.timeout(0)
      await setupTest()
    })

    
  // before(async function () {
  //   this.timeout(0)
  //   await network.provider.request({
  //     method: 'hardhat_reset',
  //     params: [
  //       {
  //         forking: {
  //           jsonRpcUrl: 'https://devnet.neonevm.org',
  //           blockNumber: 174365480,
  //         },
  //       },
  //     ],
  //   })
  // })

  it('performs a swap then starts bridge transaction on the sending chain', async () => {
    const amountIn = utils.parseUnits('1010', 6)
    const amountOut = utils.parseUnits('1000', 6)

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time

    const moraswap = new Contract(
      MORASWAP_ADDRESS,
      [
        'function swap(uint8,uint8,uint256,uint256,uint256) external payable returns (uint256)',
      ],
    )

    // Generate swap calldata
    const swapData = await moraswap.populateTransaction.swap(
      0,
      1,
      amountIn,
      amountOut,
      deadline
    )


    console.log(swapData)

       // Approve ERC20 for swapping
       const token = ERC20__factory.connect(USDC, bob)
       await token.approve(Kana.address, amountIn)
   
       const postToken = ERC20__factory.connect(mUSDC_ADDRESS, bob)
   
       const preBalance = await postToken.balanceOf(bob.address)

      console.log({preBalance})

      
try{
  let res =await  Kana.connect(bob).swapTokensGeneric(
    utils.randomBytes(32),
    'Moraswap',
    ZERO_ADDRESS,
    bob.address,
    utils.parseUnits('1000', 6),
    [
      {
        callTo: <string>swapData.to,
        approveTo: <string>swapData.to,
        sendingAssetId: USDC,
        receivingAssetId: mUSDC_ADDRESS,
        callData: <string>swapData?.data,
        fromAmount: amountIn,
        requiresDeposit: true,
      },
    ],
    {
      gasLimit: 500000,
    }
  )

  console.log(res)
}
catch(err){
  console.log(err)
}
      

  
      // expect(postBalance.gt(preBalance)).to.eq(true)
  })

})

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

const WNEON = '0xf1041596da0499c3438e3B1Eb7b95354C6Aed1f5'
const MORA_ADDRESS = '0x6Ab1F83c0429A1322D7ECDFdDf54CE6D179d911f'
const mUSDC_ADDRESS = '0x7ff459CE3092e8A866aA06DA88D291E2E31230C1'
const MORASWAP_ADDRESS = '0x696d73D7262223724d60B2ce9d6e20fc31DfC56B'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('GenericSwapFacet', async () => {
  let dexMgr: DexManagerFacet
  let bob: SignerWithAddress
  let Kana: GenericSwapFacet
  

//@ts-ignore
    bob = await ethers.getSigner('0xDBE3B915A52e30bd6B28aCbc00c53A399e99e5f7')


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
  })

})

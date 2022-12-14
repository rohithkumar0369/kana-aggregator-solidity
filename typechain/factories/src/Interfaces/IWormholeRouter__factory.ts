/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IWormholeRouter,
  IWormholeRouterInterface,
} from "../../../src/Interfaces/IWormholeRouter";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedVm",
        type: "bytes",
      },
    ],
    name: "completeTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedVm",
        type: "bytes",
      },
    ],
    name: "completeTransferAndUnwrapETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "recipientChain",
        type: "uint16",
      },
      {
        internalType: "bytes32",
        name: "recipient",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "arbiterFee",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "nonce",
        type: "uint32",
      },
    ],
    name: "transferTokens",
    outputs: [
      {
        internalType: "uint64",
        name: "sequence",
        type: "uint64",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "recipientChain",
        type: "uint16",
      },
      {
        internalType: "bytes32",
        name: "recipient",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "arbiterFee",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "nonce",
        type: "uint32",
      },
    ],
    name: "wrapAndTransferETH",
    outputs: [
      {
        internalType: "uint64",
        name: "sequence",
        type: "uint64",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

export class IWormholeRouter__factory {
  static readonly abi = _abi;
  static createInterface(): IWormholeRouterInterface {
    return new utils.Interface(_abi) as IWormholeRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IWormholeRouter {
    return new Contract(address, _abi, signerOrProvider) as IWormholeRouter;
  }
}

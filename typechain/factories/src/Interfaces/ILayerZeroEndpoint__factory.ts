/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ILayerZeroEndpoint,
  ILayerZeroEndpointInterface,
} from "../../../src/Interfaces/ILayerZeroEndpoint";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "_userApplication",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_payload",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "_payInZRO",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "_adapterParam",
        type: "bytes",
      },
    ],
    name: "estimateFees",
    outputs: [
      {
        internalType: "uint256",
        name: "nativeFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "zroFee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_srcChainId",
        type: "uint16",
      },
      {
        internalType: "bytes",
        name: "_srcAddress",
        type: "bytes",
      },
    ],
    name: "forceResumeReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainId",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_version",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "_chainId",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "_userApplication",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_configType",
        type: "uint256",
      },
    ],
    name: "getConfig",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_srcChainId",
        type: "uint16",
      },
      {
        internalType: "bytes",
        name: "_srcAddress",
        type: "bytes",
      },
    ],
    name: "getInboundNonce",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "_srcAddress",
        type: "address",
      },
    ],
    name: "getOutboundNonce",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userApplication",
        type: "address",
      },
    ],
    name: "getReceiveLibraryAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userApplication",
        type: "address",
      },
    ],
    name: "getReceiveVersion",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userApplication",
        type: "address",
      },
    ],
    name: "getSendLibraryAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userApplication",
        type: "address",
      },
    ],
    name: "getSendVersion",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_srcChainId",
        type: "uint16",
      },
      {
        internalType: "bytes",
        name: "_srcAddress",
        type: "bytes",
      },
    ],
    name: "hasStoredPayload",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isReceivingPayload",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isSendingPayload",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_srcChainId",
        type: "uint16",
      },
      {
        internalType: "bytes",
        name: "_srcAddress",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "_dstAddress",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "_nonce",
        type: "uint64",
      },
      {
        internalType: "uint256",
        name: "_gasLimit",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_payload",
        type: "bytes",
      },
    ],
    name: "receivePayload",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_srcChainId",
        type: "uint16",
      },
      {
        internalType: "bytes",
        name: "_srcAddress",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_payload",
        type: "bytes",
      },
    ],
    name: "retryPayload",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_dstChainId",
        type: "uint16",
      },
      {
        internalType: "bytes",
        name: "_destination",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_payload",
        type: "bytes",
      },
      {
        internalType: "address payable",
        name: "_refundAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_zroPaymentAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_adapterParams",
        type: "bytes",
      },
    ],
    name: "send",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_version",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "_chainId",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "_configType",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_config",
        type: "bytes",
      },
    ],
    name: "setConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_version",
        type: "uint16",
      },
    ],
    name: "setReceiveVersion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_version",
        type: "uint16",
      },
    ],
    name: "setSendVersion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ILayerZeroEndpoint__factory {
  static readonly abi = _abi;
  static createInterface(): ILayerZeroEndpointInterface {
    return new utils.Interface(_abi) as ILayerZeroEndpointInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ILayerZeroEndpoint {
    return new Contract(address, _abi, signerOrProvider) as ILayerZeroEndpoint;
  }
}

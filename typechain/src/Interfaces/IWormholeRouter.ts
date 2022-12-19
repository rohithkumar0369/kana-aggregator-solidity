/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface IWormholeRouterInterface extends utils.Interface {
  functions: {
    "completeTransfer(bytes)": FunctionFragment;
    "completeTransferAndUnwrapETH(bytes)": FunctionFragment;
    "transferTokens(address,uint256,uint16,bytes32,uint256,uint32)": FunctionFragment;
    "wrapAndTransferETH(uint16,bytes32,uint256,uint32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "completeTransfer"
      | "completeTransferAndUnwrapETH"
      | "transferTokens"
      | "wrapAndTransferETH"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "completeTransfer",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "completeTransferAndUnwrapETH",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferTokens",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "wrapAndTransferETH",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "completeTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "completeTransferAndUnwrapETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "wrapAndTransferETH",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IWormholeRouter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IWormholeRouterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    completeTransfer(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    completeTransferAndUnwrapETH(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferTokens(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    wrapAndTransferETH(
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  completeTransfer(
    encodedVm: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  completeTransferAndUnwrapETH(
    encodedVm: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferTokens(
    token: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    recipientChain: PromiseOrValue<BigNumberish>,
    recipient: PromiseOrValue<BytesLike>,
    arbiterFee: PromiseOrValue<BigNumberish>,
    nonce: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  wrapAndTransferETH(
    recipientChain: PromiseOrValue<BigNumberish>,
    recipient: PromiseOrValue<BytesLike>,
    arbiterFee: PromiseOrValue<BigNumberish>,
    nonce: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    completeTransfer(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    completeTransferAndUnwrapETH(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferTokens(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    wrapAndTransferETH(
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    completeTransfer(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    completeTransferAndUnwrapETH(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferTokens(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    wrapAndTransferETH(
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    completeTransfer(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    completeTransferAndUnwrapETH(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferTokens(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    wrapAndTransferETH(
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import {LibAsset} from "../Libraries/LibAsset.sol";
import {LibUtil} from "../Libraries/LibUtil.sol";
import {InvalidReceiver, InformationMismatch, InvalidSendingToken, InvalidAmount, NativeAssetNotSupported, InvalidDestinationChain} from "../Errors/GenericErrors.sol";
import {IKana} from "../Interfaces/IKana.sol";
import {LibSwap} from "../Libraries/LibSwap.sol";

contract Validatable {
    modifier validateBridgeData(IKana.BridgeData memory _bridgeData) {
        // if (LibUtil.isZeroAddress(_bridgeData.receiver)) {
        //     revert InvalidReceiver();
        // }
        if (_bridgeData.minAmount == 0) {
            revert("InvalidAmount()");
        }
        _;
    }

    modifier noNativeAsset(IKana.BridgeData memory _bridgeData) {
        if (LibAsset.isNativeAsset(_bridgeData.sendingAssetId)) {
            revert("NativeAssetNotSupported()");
        }
        _;
    }

    modifier onlyAllowSourceToken(
        IKana.BridgeData memory _bridgeData,
        address _token
    ) {
        if (_bridgeData.sendingAssetId != _token) {
            revert("InvalidSendingToken()");
        }
        _;
    }

    modifier onlyAllowDestinationChain(
        IKana.BridgeData memory _bridgeData,
        uint256 _chainId
    ) {
        if (_bridgeData.destinationChainId != _chainId) {
            revert("InvalidDestinationChain()");
        }
        _;
    }

    modifier containsSourceSwaps(IKana.BridgeData memory _bridgeData) {
        if (!_bridgeData.hasSourceSwaps) {
            revert("InformationMismatch()");
        }
        _;
    }

    modifier doesNotContainSourceSwaps(IKana.BridgeData memory _bridgeData) {
        if (_bridgeData.hasSourceSwaps) {
            revert("InformationMismatch()");
        }
        _;
    }

    modifier doesNotContainDestinationCalls(
        IKana.BridgeData memory _bridgeData
    ) {
        if (_bridgeData.hasDestinationCall) {
            revert("InformationMismatch()");
        }
        _;
    }
}

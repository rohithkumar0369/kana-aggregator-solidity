// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../Interfaces/IKana.sol";
import "../Libraries/LibAsset.sol";
import "../Libraries/LibDiamond.sol";
import "../Helpers/ReentrancyGuard.sol";
import "../Errors/GenericErrors.sol";
import "../Helpers/SwapperV2.sol";
import "../Libraries/LibMappings.sol";
import "../Helpers/Validatable.sol";
import "../Interfaces/ILayerZeroEndpoint.sol";

contract LayerZeroFacet is IKana, ReentrancyGuard, SwapperV2, Validatable {
    /// @notice The contract address of the LayerZero router on the source chain.
    ILayerZeroEndpoint private immutable router;

    // packet type
    uint16 public constant PT_SEND = 0;

    struct LzData {
        bytes toAddress;
        uint256 minAmountLD;
        // uint256 dstGasForCall;
        uint256 lzFee;
        address payable refundAddress;
        // bytes callTo;
        // bytes callData;
    }

    constructor(ILayerZeroEndpoint _router) {
        router = _router;
    }

    /// External Methods ///

    /// @notice Bridges tokens via Layer Zero
    /// @param _bridgeData Data contaning core information for bridging
    function startBridgeTokensViaLayerZeroBridge(
        IKana.BridgeData memory _bridgeData,
        LzData calldata _lzData
    )
        external
        payable
        nonReentrant
        refundExcessNative(payable(msg.sender))
        doesNotContainSourceSwaps(_bridgeData)
        doesNotContainDestinationCalls(_bridgeData)
        validateBridgeData(_bridgeData)
    {
        LibAsset.depositAsset(
            _bridgeData.sendingAssetId,
            _bridgeData.minAmount
        );
        _startBridge(_bridgeData, _lzData);
    }

    /// @notice Performs a swap before bridging via LayerZero Bridge
    /// @param _bridgeData Data contaning core information for bridging
    /// @param _swapData An array of swap related data for performing swaps before bridging
    function swapAndStartBridgeTokensViaOmniBridge(
        IKana.BridgeData memory _bridgeData,
        LibSwap.SwapData[] calldata _swapData
    )
        external
        payable
        nonReentrant
        refundExcessNative(payable(msg.sender))
        containsSourceSwaps(_bridgeData)
        doesNotContainDestinationCalls(_bridgeData)
        validateBridgeData(_bridgeData)
    {
        _bridgeData.minAmount = _depositAndSwap(
            _bridgeData.transactionId,
            _bridgeData.minAmount,
            _swapData,
            payable(msg.sender)
        );
        // _startBridge(_bridgeData);
    }

    /// Private Methods ///

    /// @dev Contains the business logic for the bridge via Stargate Bridge
    /// @param _bridgeData Data used purely for tracking and analytics
    function _startBridge(
        IKana.BridgeData memory _bridgeData,
        LzData calldata _lzData
    ) private noNativeAsset(_bridgeData) {
        // uint16 toLayerZeroChainId = getLayerZeroChainId(_bridgeData.destinationChainId);
        // uint16 fromLayerZeroChainId = getLayerZeroChainId(block.chainid);

        // {
        //     if (block.chainid == _bridgeData.destinationChainId) revert CannotBridgeToSameNetwork();
        //     if (toLayerZeroChainId == 0) revert UnsupportedChainId(_bridgeData.destinationChainId);
        //     if (fromLayerZeroChainId == 0) revert UnsupportedChainId(block.chainid);
        //     if (fromLayerZeroChainId == toLayerZeroChainId) revert CannotBridgeToSameNetwork();
        // }

        LibAsset.maxApproveERC20(
            IERC20(_bridgeData.sendingAssetId),
            address(router),
            _bridgeData.minAmount
        );
        bytes memory lzPayload = abi.encode(
            PT_SEND,
            _bridgeData.receiver,
            _lzData.minAmountLD
        );

        router.send{value: _lzData.lzFee}(
            uint16(_bridgeData.destinationChainId),
            _lzData.toAddress,
            lzPayload,
            _lzData.refundAddress,
            address(0x0),
            bytes("")
        );
    }

    /// @notice Gets the Layer Zero chain id for a given kana chain id
    /// @param _kanaChainId uint256 of the Kana chain ID
    /// @return uint16 of the wormhole chain id
    function getLayerZeroChainId(uint256 _kanaChainId)
        private
        view
        returns (uint16)
    {
        LibMappings.LayerZeroMappings storage sm = LibMappings
            .getLayerZeroMappings();
        uint16 LayerZeroChainId = sm.LayerZeroChainId[_kanaChainId];
        if (LayerZeroChainId == 0) revert("UnsupportedChainId");
        return LayerZeroChainId;
    }
}

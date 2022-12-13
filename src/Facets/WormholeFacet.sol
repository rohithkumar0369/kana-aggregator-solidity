// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IKana} from "../Interfaces/IKana.sol";
import {LibDiamond} from "../Libraries/LibDiamond.sol";
import {LibAsset} from "../Libraries/LibAsset.sol";
import {LibSwap} from "../Libraries/LibSwap.sol";
import { IWormholeRouter } from "../Interfaces/IWormholeRouter.sol";
import {ReentrancyGuard} from "../Helpers/ReentrancyGuard.sol";
import {InvalidAmount, CannotBridgeToSameNetwork, InvalidConfig, UnsupportedChainId} from "../Errors/GenericErrors.sol";
import {SwapperV2} from "../Helpers/SwapperV2.sol";
import {LibDiamond} from "../Libraries/LibDiamond.sol";
import {Validatable} from "../Helpers/Validatable.sol";
import {LibMappings} from "../Libraries/LibMappings.sol";

contract WormholeFacet is IKana, ReentrancyGuard, SwapperV2, Validatable {
        bytes32 internal constant NAMESPACE = keccak256("com.kana.facets.wormhole");

    /// @notice The contract address of the wormhole router on the source chain.
    IWormholeRouter private immutable router;

    /// Types ///

    struct Storage {
        // Mapping between kana chain id and wormhole chain id
        mapping(uint256 => uint16) wormholeChainId;
    }

    /// Events ///

    event WormholeChainIdMapped(uint256 indexed lifiChainId, uint256 indexed wormholeChainId);

    
    /// Types ///

    /// @param assetId The contract address of the token being bridged.
    /// @param amount The amount of tokens to bridge.
    /// @param receiver The address of the token receiver after bridging.
    /// @param toChainId The chainId of the chain to bridge to.
    /// @param arbiterFee The amount of token to pay a relayer (can be zero if no relayer is used).
    /// @param nonce A random nonce to associate with the tx.
    struct WormholeData {
        uint256 arbiterFee;
        uint32 nonce;
    }

        /// Constructor ///

    /// @notice Initialize the contract.
    /// @param _router The contract address of the wormhole router on the source chain.
    constructor(IWormholeRouter _router) {
        router = _router;
    }

    /// External Methods ///

    /// @notice Bridges tokens via Wormhole
    /// @param _bridgeData the core information needed for bridging
    /// @param _wormholeData data specific to Wormhole
    
     function startBridgeTokensViaWormhole(IKana.BridgeData memory _bridgeData, WormholeData calldata _wormholeData)
        external
        payable
        refundExcessNative(payable(msg.sender))
        doesNotContainSourceSwaps(_bridgeData)
        doesNotContainDestinationCalls(_bridgeData)
        validateBridgeData(_bridgeData)
        nonReentrant
    {
        LibAsset.depositAsset(_bridgeData.sendingAssetId, _bridgeData.minAmount);
        _startBridge(_bridgeData, _wormholeData);
    }


        /// Private Methods ///

    /// @dev Contains the business logic for the bridge via Wormhole
    /// @param _bridgeData the core information needed for bridging
    /// @param _wormholeData data specific to Wormhole
    function _startBridge(IKana.BridgeData memory _bridgeData, WormholeData calldata _wormholeData) private {
        // uint16 toWormholeChainId = getWormholeChainId(_bridgeData.destinationChainId);
        // uint16 fromWormholeChainId = getWormholeChainId(block.chainid);

        // {
        //     if (block.chainid == _bridgeData.destinationChainId) revert CannotBridgeToSameNetwork();
        //     if (toWormholeChainId == 0) revert UnsupportedChainId(_bridgeData.destinationChainId);
        //     if (fromWormholeChainId == 0) revert UnsupportedChainId(block.chainid);
        //     if (fromWormholeChainId == toWormholeChainId) revert CannotBridgeToSameNetwork();
        // }

        LibAsset.maxApproveERC20(IERC20(_bridgeData.sendingAssetId), address(router), _bridgeData.minAmount);

        if (LibAsset.isNativeAsset(_bridgeData.sendingAssetId)) {
            router.wrapAndTransferETH{ value: _bridgeData.minAmount }(
                uint16(_bridgeData.destinationChainId),
                _bridgeData.receiver,
                _wormholeData.arbiterFee,
                _wormholeData.nonce
            );
        } else {
            router.transferTokens(
                _bridgeData.sendingAssetId,
                _bridgeData.minAmount,
                uint16(_bridgeData.destinationChainId),
                _bridgeData.receiver,
                _wormholeData.arbiterFee,
                _wormholeData.nonce
            );
        }
        emit KanaTransferStarted(_bridgeData);
    }

    /// @notice Gets the wormhole chain id for a given kana chain id
    /// @param _kanaChainId uint256 of the lifi chain ID
    /// @return uint16 of the wormhole chain id
    function getWormholeChainId(uint256 _kanaChainId) private view returns (uint16) {
        LibMappings.WormholeMappings storage sm = LibMappings.getWormholeMappings();
        uint16 wormholeChainId = sm.wormholeChainId[_kanaChainId];
        if (wormholeChainId == 0) revert UnsupportedChainId(_kanaChainId);
        return wormholeChainId;
    }

    function claimToken() external {
        
    }
}
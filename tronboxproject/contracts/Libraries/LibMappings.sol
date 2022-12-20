// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../Errors/GenericErrors.sol";
import "../Libraries/LibAccess.sol";

/// @title Mappings Library
/// @author LI.FI (https://li.fi)
/// @notice Provides mappings for all facets that may need them
library LibMappings {
    /// Types ///
    bytes32 internal constant LAYERZERO_NAMESPACE =
        keccak256("com.kana.library.mappings.layerzero");
    bytes32 internal constant WORMHOLE_NAMESPACE =
        keccak256("com.kana.library.mappings.wormhole");
    bytes32 internal constant AMAROK_NAMESPACE =
        keccak256("com.kana.library.mappings.amarok");

    /// Storage ///
    // struct StargateMappings {
    //     mapping(address => uint16) stargatePoolId;
    //     mapping(uint256 => uint16) layerZeroChainId;
    //     bool initialized;
    // }

    struct WormholeMappings {
        mapping(uint256 => uint16) wormholeChainId;
    }

    struct LayerZeroMappings {
        mapping(uint256 => uint16) LayerZeroChainId;
    }

    struct AmarokMappings {
        mapping(uint256 => uint32) amarokDomain;
    }

    /// @dev Fetch local storage for Stargate
    function getLayerZeroMappings()
        internal
        pure
        returns (LayerZeroMappings storage ms)
    {
        bytes32 position = LAYERZERO_NAMESPACE;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            ms.slot := position
        }
    }

    /// @dev Fetch local storage for Wormhole
    function getWormholeMappings()
        internal
        pure
        returns (WormholeMappings storage ms)
    {
        bytes32 position = WORMHOLE_NAMESPACE;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            ms.slot := position
        }
    }

    /// @dev Fetch local storage for Amarok
    function getAmarokMappings()
        internal
        pure
        returns (AmarokMappings storage ms)
    {
        bytes32 position = AMAROK_NAMESPACE;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            ms.slot := position
        }
    }
}

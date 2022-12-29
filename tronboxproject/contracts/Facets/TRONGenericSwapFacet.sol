// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../Interfaces/IKana.sol";
import "../Libraries/LibAsset.sol";
import "../Libraries/LibAllowList.sol";
import "../Helpers/ReentrancyGuard.sol";
import "../Helpers/TRONTransitSwapRouterV4.sol";
import "../Helpers/Validatable.sol";
import "../Libraries/LibUtil.sol";
import "../Errors/GenericErrors.sol";
import "../Libraries/LibDiamond.sol";
import "../Helpers/TransitStructs.sol";

/// @title TRON Generic Swap Facet
/// @author Kana Labs
/// @notice Provides functionality for swapping through ANY APPROVED DEX
/// @dev Uses calldata to execute APPROVED arbitrary methods on DEXs
abstract contract TRONGenericSwapFacet is
    IKana,
    TRONTransitSwapRouterV4,
    Validatable
{
    constructor() {}

    /// Events ///

    event KanaSwappedGeneric(
        bytes32 indexed transactionId,
        string integrator,
        string referrer,
        address fromAssetId,
        address toAssetId,
        uint256 fromAmount,
        uint256 toAmount
    );

    // uint32 FeePercentage;

    // function setFee(uint32 _fee) external {
    //     if (msg.sender != LibDiamond.contractOwner()) revert("IsNotOwner()");
    //     FeePercentage = _fee;
    // }

    // function getFee() external view returns (uint32) {
    //     return FeePercentage;
    // }

    // function _calculateFee(uint256 postSwapBalance)
    //     internal
    //     view
    //     returns (uint256)
    // {
    //     uint256 fee = (postSwapBalance * FeePercentage) / 10000;
    //     return fee;
    // }

    /// External Methods ///

    /// @notice Performs multiple swaps in one transaction
    /// @param _transactionId the transaction id associated with the operation
    /// @param _integrator the name of the integrator
    /// @param _referrer the address of the referrer

    function swapTokensGeneric(
        TransitStructs.TransitSwapDescription calldata desc,
        TransitStructs.CallbytesDescription calldata callbytesDesc,
        bytes32 _transactionId,
        string calldata _integrator,
        string calldata _referrer
    ) external payable nonReentrant whenNotPaused {
        if (LibUtil.isZeroAddress(desc.dstReceiver)) {
            revert("InvalidReceiver()");
        }
        uint256 returnAmount;
        uint256 postFee;
        (returnAmount, postFee) = this._swap(desc, callbytesDesc);

        emit KanaSwappedGeneric(
            _transactionId,
            _integrator,
            _referrer,
            desc.srcToken,
            desc.dstToken,
            desc.amount,
            returnAmount
        );
    }
}

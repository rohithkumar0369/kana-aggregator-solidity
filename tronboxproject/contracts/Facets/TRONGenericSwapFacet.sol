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

/// @title Generic Swap Facet
/// @author LI.FI (https://li.fi)
/// @notice Provides functionality for swapping through ANY APPROVED DEX
/// @dev Uses calldata to execute APPROVED arbitrary methods on DEXs
contract GenericSwapFacet is
    IKana,
    ReentrancyGuard,
    TRONTransitSwapRouterV4,
    Validatable
{
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

    uint32 FeePercentage;

    function setFee(uint32 _fee) external {
        if (msg.sender != LibDiamond.contractOwner()) revert("IsNotOwner()");
        FeePercentage = _fee;
    }

    function getFee() external view returns (uint32) {
        return FeePercentage;
    }

    function _calculateFee(uint256 postSwapBalance)
        internal
        view
        returns (uint256)
    {
        uint256 fee = (postSwapBalance * FeePercentage) / 10000;
        return fee;
    }

    /// External Methods ///

    /// @notice Performs multiple swaps in one transaction
    /// @param _transactionId the transaction id associated with the operation
    /// @param _integrator the name of the integrator
    /// @param _referrer the address of the referrer
    /// @param _receiver the address to receive the swapped tokens into (also excess tokens)
    /// @param _minAmount the minimum amount of the final asset to receive
    /// @param _swapData an object containing swap related data to perform swaps before bridging
    function swapTokensGeneric(
        TransitStructs.TransitSwapDescription calldata desc,
        TransitStructs.CallbytesDescription calldata callbytesDesc,
        bytes32 _transactionId,
        string calldata _integrator,
        string calldata _referrer
    )
        external
        payable
        refundExcessNative(_receiver)
        nonReentrant
        whenNotPaused
    {
        if (LibUtil.isZeroAddress(_receiver)) {
            revert("InvalidReceiver()");
        }

        require(
            callbytesDesc.calldatas.length > 0,
            "TransitSwap: data should be not zero"
        );
        require(
            desc.amount > 0,
            "TransitSwap: amount should be greater than 0"
        );
        require(
            desc.dstReceiver != address(0),
            "TransitSwap: receiver should be not address(0)"
        );
        require(
            desc.minReturnAmount > 0,
            "TransitSwap: minReturnAmount should be greater than 0"
        );
        if (callbytesDesc.flag == uint8(TransitStructs.Flag.aggregate)) {
            require(
                desc.srcToken == callbytesDesc.srcToken,
                "TransitSwap: invalid callbytesDesc"
            );
        }
        bool preTradeModel = !_swap_type_mode[desc.swapType];
        (uint256 swapAmount, uint256 fee, uint256 beforeBalance) = _beforeSwap(
            preTradeModel,
            desc
        );

        {
            //bytes4(keccak256(bytes('callbytes(TransitStructs.CallbytesDescription)')));
            (bool success, bytes memory result) = _transit_swap.call{
                value: swapAmount
            }(abi.encodeWithSelector(0xccbe4007, callbytesDesc));
            if (!success) {
                revert(RevertReasonParser.parse(result, "TransitSwap:"));
            }
        }

        (uint256 returnAmount, uint256 postFee) = _afterSwap(
            preTradeModel,
            desc,
            beforeBalance
        );
        if (postFee > fee) {
            fee = postFee;
        }

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

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IKana } from "../Interfaces/IKana.sol";
import { LibAsset } from "../Libraries/LibAsset.sol";
import { LibAllowList } from "../Libraries/LibAllowList.sol";
import { ReentrancyGuard } from "../Helpers/ReentrancyGuard.sol";
import { SwapperV2, LibSwap } from "../Helpers/SwapperV2.sol";
import { Validatable } from "../Helpers/Validatable.sol";
import { LibUtil } from "../Libraries/LibUtil.sol";
import { InvalidReceiver ,ContractCallNotAllowed ,IsNotOwner } from "../Errors/GenericErrors.sol";
import { LibDiamond } from "../Libraries/LibDiamond.sol";

import "hardhat/console.sol";
/// @title Generic Swap Facet
/// @author LI.FI (https://li.fi)
/// @notice Provides functionality for swapping through ANY APPROVED DEX
/// @dev Uses calldata to execute APPROVED arbitrary methods on DEXs
contract GenericSwapFacet is IKana, ReentrancyGuard, SwapperV2, Validatable {
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
    

    uint32 FeePercentage ;


    function setFee (uint32 _fee) external {
        if (msg.sender != LibDiamond.contractOwner()) revert IsNotOwner();
        FeePercentage = _fee;
    }

    function getFee() external view returns(uint32){
        return FeePercentage;
    }

    function _calculateFee(uint256 postSwapBalance) internal view returns(uint256){
        uint256 fee = postSwapBalance * FeePercentage/10000  ;
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
        bytes32 _transactionId,
        string calldata _integrator,
        string calldata _referrer,
        address payable _receiver,
        uint256 _minAmount,
        LibSwap.SwapData[] calldata _swapData
    ) external payable refundExcessNative(_receiver) nonReentrant {
        if (LibUtil.isZeroAddress(_receiver)) {
            revert InvalidReceiver();
        }

        uint256 postSwapBalance = _depositAndSwap(_transactionId, _minAmount, _swapData, _receiver);
        address receivingAssetId = _swapData[_swapData.length - 1].receivingAssetId;
        uint256 amountOut = postSwapBalance - _calculateFee(postSwapBalance);
        LibAsset.transferAsset(receivingAssetId, _receiver, amountOut);

        emit KanaSwappedGeneric(
            _transactionId,
            _integrator,
            _referrer,
            _swapData[0].sendingAssetId,
            receivingAssetId,
            _swapData[0].fromAmount,
            postSwapBalance
        );
    }
}

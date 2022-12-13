// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IWormholeRouter {
    function transferTokens(
        address token,
        uint256 amount,
        uint16 recipientChain, 
        bytes32 recipient, 
        uint256 arbiterFee, 
        uint32 nonce
        ) external payable returns (uint64 sequence);

    function wrapAndTransferETH(
        uint16 recipientChain, 
        bytes32 recipient, 
        uint256 arbiterFee, 
        uint32 nonce
        ) external payable returns (uint64 sequence);

     function completeTransfer(
        bytes memory encodedVm
        ) external;

    function completeTransferAndUnwrapETH(
        bytes memory encodedVm
        ) external;
}

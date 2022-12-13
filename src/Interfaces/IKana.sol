// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IKana {
    /// Structs ///

    struct BridgeData {
        bytes32 transactionId;
        string bridge;
        string integrator;
        address referrer;
        address sendingAssetId;
        bytes32 receiver;
        uint256 minAmount;
        uint256 destinationChainId;
        bool hasSourceSwaps;
        bool hasDestinationCall;
    }

    /// Events ///

    event KanaTransferStarted(IKana.BridgeData bridgeData);

    event KanaTransferCompleted(
        bytes32 indexed transactionId,
        address receivingAssetId,
        address receiver,
        uint256 amount,
        uint256 timestamp
    );
}

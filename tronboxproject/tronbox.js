const port = process.env.HOST_PORT || 9090

module.exports = {
    networks: {
        compilers: {
            solc: {
                version: '0.8.6'
            }
        },
        mainnet: {
            privateKey: process.env.PRIVATE_KEY_MAINNET,
            userFeePercentage: 100,
            feeLimit: 1000 * 1e6,
            fullHost: 'https://api.trongrid.io',
            network_id: '1'
        },
        shasta: {
            from: "TL4HC28ASqQzdS2rVDpg6QbjctXHVWrdEZ",
            privateKey: "f92f8d036a6b75b81b6bdc0caed77b1fd2976b37b8612e6dbbba06802e609572",
            userFeePercentage: 50,
            // feeLimit: 1e9,
            // originEnergyLimit: 1e7,
            fullHost: 'https://api.shasta.trongrid.io',
            network_id: '2',
            timeout: 10000000
        },
        nile: {
            privateKey: process.env.PRIVATE_KEY_NILE,
            userFeePercentage: 100,
            feeLimit: 1000 * 1e6,
            fullHost: 'https://api.nileex.io',
            network_id: '3'
        },
        development: {
            privateKey: '0000000000000000000000000000000000000000000000000000000000000001',
            userFeePercentage: 0,
            feeLimit: 1000 * 1e6,
            fullHost: 'http://127.0.0.1:' + port,
            network_id: '9'
        },
        compilers: {
            solc: {
                version: '0.8.6'
            }
        }
    },
    // solc compiler optimize
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        },
        evmVersion: 'istanbul'
    }
}

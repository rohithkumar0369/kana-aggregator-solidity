interface DEXConfig {
  [key: string]: string[]
}

// dodo: https://dodoex.github.io/docs/docs/deployedInfo
// paraswap: https://developers.paraswap.network/smart-contracts
// openocean: https://docs.openocean.finance/smart-contract-address-update-notice
// 1inch: https://docs.1inch.io/docs/aggregation-protocol/api/swagger
// 0x: https://docs.0x.org/developer-resources/contract-addresses
// other: https://github.com/lifinance/types/blob/main/src/exchanges.ts

const config: DEXConfig = {
  hardhat: [],
  // testnets

  goerli: [
    '0x7a250d5630b4cf539739df2c5dacb4c659f2488d', // uniswap
    '0x30ae282cf477e2ef28b14d0125acead57fe1d7a1', // Superfluid - Upgrader
    '0x1fA76f2Cd0C3fe6c399A80111408d9C42C0CAC23', // Superfluid - Upgrader
  ],
  polygonMumbai: [],
  neonlabs :[
    "0x696d73D7262223724d60B2ce9d6e20fc31DfC56B"  //moraswap
  ]
}

export default config

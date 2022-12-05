interface WormholeConfig {
  [key: string]: {
    wormholeRouter: string
  }
}

const config: WormholeConfig = {
  // leave wormholeRouter as '' if you want to deploy a router with deployments
  hardhat: {
    wormholeRouter: '0x5a58505a96D1dbf8dF91cB21B54419FC36e93fdE',
  },
  mainnet: {
    wormholeRouter: '-',
  },
  rinkeby: {
    wormholeRouter: '-',
  },
  ropsten: {
    wormholeRouter: '-',
  },
  goerli: {
    wormholeRouter: '0xF890982f9310df57d00f659cf4fd87e65adEd8d7',
  },
  polygon: {
    wormholeRouter: '-',
  },
  xdai: {
    wormholeRouter: '-',
  },
  bsc: {
    wormholeRouter: '-',
  },
  opera: {
    wormholeRouter: '-',
  },
  mumbai: {
    wormholeRouter: '-',
  },
  arbitrumOne_rinkeby: {
    wormholeRouter: '-',
  },
}

export default config

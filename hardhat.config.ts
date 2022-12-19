import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import { node_url, accounts } from "./utils/network";
import "@typechain/hardhat";

const proxy_url = "https://devnet.neonevm.org";

//const proxy_url =  'https://proxy.devnet.neonlabs.org/solana';

const network_id = 245022926;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "shasta",
  networks: {
    neonlabs: {
      url: proxy_url,
      accounts: accounts("neonlabs"),
      // network_id: network_id,
      chainId: network_id,
      allowUnlimitedContractSize: false,
      timeout: 1000000,
      // isFork: true
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/644x8HtviMTzfvqnywPSUnu9hCip-JOw",
      accounts: accounts("goerli"),
    },
    liberty: {
      url: node_url("liberty"),
      chainId: 8080,
      accounts: accounts("liberty"),
    },
    polygonMumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/Ay69wiKhYePKe2fi2C1q1FxLjS3Ey2IY",
      accounts: accounts("polygonMumbai"),
    },
    shasta: {
      url: "https://api.shasta.trongrid.io/jsonrpc",
      accounts: accounts("shasta"),
      chainId: 2494104990,
    },
  },
  namedAccounts: {
    deployer: 0,
    // tokenOwner: 1,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  paths: {
    sources: "src",
  },
  mocha: {
    timeout: 1000000,
  },
};
export default config;

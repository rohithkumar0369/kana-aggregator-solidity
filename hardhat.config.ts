import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const proxy_url = 'https://devnet.neonevm.org';
const network_id = 245022926;

const ALCHEMY_API_KEY = "-wPvufVHMDJUtNFRLKXLW0HTDQaPV6ez";

const PRIVATE_KEY = "7fe1d94e8e2c60c51d836a7a6706cb667f2a39e1299602ed9cc0e09a0dad8996";


const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    neonlabs: {
      url: proxy_url,
      accounts: [PRIVATE_KEY],
      // network_id: network_id,
      chainId: network_id,
      allowUnlimitedContractSize: false,
      timeout: 1000000,
      // isFork: true
    }
  }
};

export default config;

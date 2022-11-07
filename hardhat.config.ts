import {HardhatUserConfig} from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import {node_url, accounts} from './utils/network';


const proxy_url = 'https://devnet.neonevm.org';
const network_id = 245022926;

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
  },
  defaultNetwork:'neonlabs',
  networks: {
    neonlabs: {
      url: proxy_url,
      accounts: accounts('neonlabs'),
         // network_id: network_id,
         chainId: network_id,
         allowUnlimitedContractSize: false,
         timeout: 1000000,
         // isFork: true
    },
    goerli: {
      url: node_url('goerli'),
      accounts: accounts('goerli')
    },
  },
  namedAccounts: {
    deployer: 0,
    tokenOwner: 1,
  },
  paths: {
    sources: 'src',
  },
};
export default config;

import {HardhatUserConfig} from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import {node_url, accounts} from './utils/network';
import '@typechain/hardhat'


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
    // tokenOwner: 1,
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  paths: {
    sources: 'src',
  },
  mocha: {
    timeout: 60000,
  },
};
export default config;

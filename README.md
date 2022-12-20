# kana-aggregator-solidity (TRON Deployment)

**Initialise a project**

```
npm i tronbox
mkdir project
cd project
tronbox init
```

**Config**

tronbox.js

```js
module.exports = {
    compilers: {
        solc: {
            version: '0.8.9'
        }
    },
...
...
...
  shasta: {
    privateKey: process.env.PRIVATE_KEY_SHASTA,
    userFeePercentage: 50,
    feeLimit: 1000 * 1e6,
    fullHost: "https://api.shasta.trongrid.io",
    network_id: "2",
  },
...
...
...
};
```

**Compile**

```
tronbox compile

// output

Compiling ./contracts/Errors/GenericErrors.sol...
Compiling ./contracts/Facets/DexManagerFacet.sol...
Compiling ./contracts/Facets/GenericSwapFacet.sol...
Compiling ./contracts/Facets/LayerZeroFacet.sol...
Compiling ./contracts/Facets/WormholeFacet.sol...
Compiling ./contracts/Helpers/ReentrancyGuard.sol...
Compiling ./contracts/Helpers/SwapperV2.sol...
Compiling ./contracts/Helpers/Validatable.sol...
Compiling ./contracts/Interfaces/IDiamondCut.sol...
Compiling ./contracts/Interfaces/IKana.sol...
Compiling ./contracts/Interfaces/ILayerZeroEndpoint.sol...
Compiling ./contracts/Interfaces/ILayerZeroUserApplicationConfig.sol...
Compiling ./contracts/Interfaces/IWormholeRouter.sol...
Compiling ./contracts/Libraries/LibAccess.sol...
Compiling ./contracts/Libraries/LibAllowList.sol...
Compiling ./contracts/Libraries/LibAsset.sol...
Compiling ./contracts/Libraries/LibBytes.sol...
Compiling ./contracts/Libraries/LibDiamond.sol...
Compiling ./contracts/Libraries/LibMappings.sol...
Compiling ./contracts/Libraries/LibSwap.sol...
Compiling ./contracts/Libraries/LibUtil.sol...
Compiling @openzeppelin/contracts/token/ERC20/ERC20.sol...
Compiling @openzeppelin/contracts/token/ERC20/IERC20.sol...
Compiling @openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol...
Compiling @openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol...
Compiling @openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol...
Compiling @openzeppelin/contracts/utils/Address.sol...
Compiling @openzeppelin/contracts/utils/Context.sol...
Writing artifacts to ./build/contracts
```

**DEPLOYMENT (SHASTA)**

Deploying the contracts on shastra testnet network.

Scripts :

- tronboxproject/migrations/000_initial_migration.js
- tronboxproject/migrations/001_deploy_initial_facets.js
- tronboxproject/migrations/002_diamond_deploy.js

```
npx tronbox migrate --reset --network shasta
```

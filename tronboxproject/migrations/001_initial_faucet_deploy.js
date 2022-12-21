var DexManagerFaucet = artifacts.require("./DexManagerFacet.sol");
var DiamondCutFacet = artifacts.require("./DiamondCutFacet.sol");
var DiamondLoupeFacet = artifacts.require("./DiamondLoupeFacet.sol");
var GenericSwapFacet = artifacts.require("./GenericSwapFacet.sol");
var OwnershipFacet = artifacts.require("./OwnershipFacet.sol");
var WormholeFacet = artifacts.require("./WormholeFacet.sol");
var KanaDiamond = artifacts.require("./KanaDiamond.sol");

const CONTRACT_OWNER_ADDRESS = "TL4HC28ASqQzdS2rVDpg6QbjctXHVWrdEZ"

module.exports = function (deployer) {
    // deployer.deploy(DexManagerFaucet).then(() => {
    //     console.log("DexManagerFaucet deployed ✅");
    // });

    // deployer.deploy(DiamondLoupeFacet).then(() => {
    //     console.log("DiamondLoupeFacet deployed ✅");
    // });

    // deployer.deploy(GenericSwapFacet).then(() => {
    //     console.log("GenericSwapFacet deployed ✅");
    // });

    // deployer.deploy(OwnershipFacet).then(() => {
    //     console.log("OwnershipFacet deployed ✅");
    // });

    // deployer.deploy(WormholeFacet).then(() => {
    //     console.log("WormholeFacet deployed ✅");
    // });

    deployer.deploy(DiamondCutFacet).then(() => {
        console.log("DiamondCutFacet deployed ✅");
        return deployer.deploy(KanaDiamond, CONTRACT_OWNER_ADDRESS, DiamondCutFacet.address);
    });
}
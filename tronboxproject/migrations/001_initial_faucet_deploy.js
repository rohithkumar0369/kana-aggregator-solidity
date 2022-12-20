var DexManagerFaucet = artifacts.require("./DexManagerFacet.sol");
var DiamondCutFacet = artifacts.require("./DiamondCutFacet.sol");
var DiamondLoupeFacet = artifacts.require("./DiamondLoupeFacet.sol");
var GenericSwapFacet = artifacts.require("./GenericSwapFacet.sol");
var OwnershipFacet = artifacts.require("./OwnershipFacet.sol");
var WormholeFacet = artifacts.require("./WormholeFacet.sol");

module.exports = function (deployer) {
    deployer.deploy(DexManagerFaucet).then(() => {
        console.log("DexManagerFaucet deployed ✅");
    });

    // deployer.deploy(DiamondCutFacet);
    // console.log("DiamondCutFacet deployed ✅");

    // deployer.deploy(DiamondLoupeFacet);
    // console.log("DiamondLoupeFacet deployed ✅");

    // deployer.deploy(GenericSwapFacet);
    // console.log("GenericSwapFacet deployed ✅");

    // deployer.deploy(OwnershipFacet);
    // console.log("OwnershipFacet deployed ✅");

    // deployer.deploy(WormholeFacet);
    // console.log("WormholeFacet deployed ✅")
}
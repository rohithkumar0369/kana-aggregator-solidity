var KanaDiamond = artifacts.require("./KanaDiamond.sol");

const CONTRACT_OWNER_ADDRESS = ""
const DIAMOND_CUT_FACET_ADDRESS = ""

module.exports = function (deployer) {
    deployer.deploy(KanaDiamond, CONTRACT_OWNER_ADDRESS, DIAMOND_CUT_FACET_ADDRESS);
}
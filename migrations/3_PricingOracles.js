let PricingOracles = artifacts.require("./PricingOracles.sol");

module.exports = function(deployer, network, accounts) {
    deployer.deploy(PricingOracles, {overwrite: false});
};

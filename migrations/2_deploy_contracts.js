var HamsterGraveyard = artifacts.require("./HamsterGraveyard.sol");

module.exports = function(deployer) {
  deployer.deploy(HamsterGraveyard);
};

var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var HamsterGraveyard = artifacts.require("./HamsterGraveyard.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(HamsterGraveyard);
};

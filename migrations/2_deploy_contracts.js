var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var HamsterGraveyad = artifacts.require("./HamsterGraveyard.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(HamsterGraveyard);
};

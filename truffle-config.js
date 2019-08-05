const path = require("path");
//var HDWalletProvider = require("truffle-hdwallet-provider");

const MNEMONIC = 'MNEMONIC';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/KEY")
      },
      network_id: 3,
      gas: 4000000
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://rinkeby.infura.io/v3/KEY")
      },
      network_id: 4,
      gas: 4000000
    }
  }
};

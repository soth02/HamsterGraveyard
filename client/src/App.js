import React, { Component } from "react";
import ReactDOM from 'react-dom';
import HamsterGraveyardContract from "./contracts/HamsterGraveyard.json";
import getWeb3 from "./utils/getWeb3";

import Grave from "./components/Grave";
import GraveForm from "./components/GraveForm";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, idGenerator: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HamsterGraveyardContract.networks[networkId];
      const instance = new web3.eth.Contract(
        HamsterGraveyardContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.idGenerator().call();

    // Update state with the result.
    this.setState({ idGenerator: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>The idGenerator value is: {this.state.idGenerator}</div>
        <GraveForm/>
      </div>
    );
  }
}

export default App;

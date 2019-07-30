import React, { Component } from "react";
import ReactDOM from 'react-dom';
import HamsterGraveyardContract from "./contracts/HamsterGraveyard.json";
import getWeb3 from "./utils/getWeb3";

import Grave from "./components/Grave";
import GraveForm from "./components/GraveForm";
import AddGraveButton from "./components/AddGraveButton";

import "./App.css";

class App extends Component {
  state = { gravesList: [], web3: null, accounts: null, contract: null, idGenerator: null };

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


    // Get the value from the contract to prove it worked.
    const response = await contract.methods.idGenerator().call();

    //const testAddGrave = await contract.methods.addHamsterGrave('totoro', 1, 2, 'RIP').call();

    // Update state with the result.
    this.setState({ idGenerator: response });
  };

  populateGraveyard = async () => {
    var temp;
    var gravesListTemp = [];

    const { accounts, contract } = this.state;

    const response = await contract.methods.idGenerator().call();
    this.setState({ idGenerator: response });

    for(var i = 0; i < this.idGenerator; i++){
          temp = await contract.methods.viewHamsterGrave(i);

          gravesListTemp[i].name = temp.name;
          gravesListTemp[i].yearOfBirth = temp.yearOfBirth;
          gravesListTemp[i].yearOfDeath = temp.yearOfDeath;
          gravesListTemp[i].memoriam = temp.memoriam;
    }

    this.setState({ gravesList: gravesListTemp});

  }

  render() {

    var names =['Ham', 'Shem', 'Ham2'];
    var namesList = names.map(function(name){
      return <Grave name={name} yob={2001} yod={2002} memoriam="RIP"/>;
    })



    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>The idGenerator value is {this.state.idGenerator}</div>
        <div className="ui three column grid">
          {namesList}
          <AddGraveButton/>
        </div>
      </div>
    );
  }
}

export default App;

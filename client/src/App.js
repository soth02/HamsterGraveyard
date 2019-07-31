import React, { Component } from "react";
import ReactDOM from 'react-dom';
import HamsterGraveyardContract from "./contracts/HamsterGraveyard.json";
import getWeb3 from "./utils/getWeb3";

import Grave from "./components/Grave";
import GraveForm from "./components/GraveForm";
//import AddGraveButton from "./components/AddGraveButton";

import "./App.css";

class App extends Component {
  state = { web3: null,
            accounts: null,
            contract: null,
            idGenerator: null,
            gravesList: [],
            inputName: null
  };

  componentDidMount = async () => {
    try {

      var temp;
      var gravesListTemp = [];
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

      //using contract instead of instance here seems to produce an error
      const response = await instance.methods.idGenerator().call();

      console.log("idGenerator is");
      console.log(response);

      for (var i = 0; i < response; i++) {
        temp = await instance.methods.viewHamsterGrave(i).call();

        gravesListTemp[i] = {
          name: temp.name,
          yearOfBirth: temp.yearOfBirth,
          yearOfDeath: temp.yearOfDeath,
          memoriam: temp.memoriam
        };
      }

      this.setState({ gravesList: gravesListTemp, idGenerator: response });

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
    const response = await contract.methods.getIdGenerator().call();

    console.log("in runExample idGenerator is");
    console.log(response);


    // Update state with the result.
    this.setState({ idGenerator: response });
  };

  onClickUpdateGrave = async () => {
    //call updateHamsterGrave with props
  }

  //call addHamsterGrave
  onClickAddGrave = async () => {
    var temp;
    var gravesListTemp = [];

    const { accounts, contract } = this.state;

    const testAddGrave = await contract.methods.addHamsterGrave('totoro', 1, 2, 'RIP').send({from: accounts[0]});

    const response = await contract.methods.getIdGenerator().call();

    for (var i = 0; i < response; i++) {
      temp = await contract.methods.viewHamsterGrave(i).call();

      gravesListTemp[i] = {
        name: temp.name,
        yearOfBirth: temp.yearOfBirth,
        yearOfDeath: temp.yearOfDeath,
        memoriam: temp.memoriam
      };
    }

    this.setState({gravesList: gravesListTemp, idGenerator: response });
  }

  render() {

    var tempGraves = this.state.gravesList;

    var namesList = tempGraves.map(function(tempGrave, index){
      return <Grave key={index} name={tempGrave.name} yob={tempGrave.yearOfBirth} yod={tempGrave.yearOfDeath} memoriam={tempGrave.memoriam}/>;
    })

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>The idGenerator value is {this.state.idGenerator}</div>
        <div className="ui three column grid">
          {namesList}
          <div className="column">
            <div className="small ui card">
              <div className="ui form">
                <h1>Add a Hamster grave </h1>
                <div className="grouped fields">
                  <div className="required field">
                    <label>Name</label>
                    <input type="text" placeholder="Hammy" />
                  </div>
                  <div className="required  field">
                    <label>Year of Birth</label>
                    <input type="Year" placeholder="2018"/>
                  </div>
                  <div className="required field">
                    <label>Year of Death</label>
                    <input type="Year" placeholder="2019"/>
                  </div>
                  <div className="required field">
                    <label>Memoriam</label>
                    <input type="text" placeholder="RIP"/>
                  </div>
                </div>
                <button onClick={this.onClickAddGrave} type="submit" className="ui submit button">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

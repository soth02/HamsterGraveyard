import React from 'react';


class Grave extends React.Component {

  constructor(props) {
    super(props);

    const { accounts, contract, web3 } = props;

    this.state = {
      accounts: props.accounts,
      contract: props.contract,
      web3: props.web3,
      hamsterGraveNum: this.props.hamsterGraveNum,
      name: null,
      yob: null,
      yod: null,
      memoriam: null,
      updatedName: null,
      updatedYOB: null,
      updatedYOD: null,
      updatedMemoriam: null,
      isFormHidden: this.props.isFormHidden
    }
  }

  onClickUpdateGrave = async () => {
    //var gravesListTemp = this.state.gravesList;
    const { accounts, contract } = this.state;

    //console.log("test");
    //call updateHamsterGrave with props
    //its id will be the same as the index of the <Grave/>
    const myupdate = await contract.methods.updateHamsterGrave(
      this.state.hamsterGraveNum,
      this.state.updatedName,
      this.state.updatedYOB,
      this.state.updatedYOD,
      this.state.updatedMemoriam
    ).send({from: accounts[0]});

    console.log("this grave was updated");
    console.log(this.props.hamsterGraveNum);
    console.log(this.state.memoriam);

    this.setState({isFormHidden: true});
    this.setState({name: this.state.updatedName});
    this.setState({yob: this.state.updatedYOB});
    this.setState({yod: this.state.updatedYOD});
    this.setState({memoriam: this.state.updatedMemoriam});
  }

  onClickRevealForm = () => {
    console.log("revealing form");

    this.state.isFormHidden ? this.setState({isFormHidden: false}) : this.setState({isFormHidden: true});
  }

  nameChangeHandler2 = event => {
    this.setState({ updatedName: event.target.value });
  }

  yOBChangeHandler2 = event => {
    this.setState({ updatedYOB: event.target.value });
  }

  yODChangeHandler2 = event => {
    this.setState({ updatedYOD: event.target.value });
  }

  memoriamChangeHandler2 = event => {
    this.setState({ updatedMemoriam: event.target.value });
  }


  render(){

    return (
      <div className="column">
        <div className="small ui card">
          <div className="image">
            <img alt='' src="./hamster_100x100.png" className="visible content"/>
          </div>
          <div className="content">
            <a className="header">{this.state.name || this.props.name}</a>
            <div className="description">
            {this.state.yob || this.props.yob}-{this.state.yod || this.props.yod}
            </div>
          </div>
          <div className="extra content">
            <a>
              {this.state.memoriam || this.props.memoriam}
            </a>
          </div>
          <button onClick={this.onClickRevealForm}>update</button>
          {this.state.isFormHidden ? null :
            <div className="column">
              <div className="small ui card">
                <div className="ui form">
                  <h1>Update Hamster grave </h1>
                  <div className="grouped fields">
                    <div className="required field">
                      <label>Name</label>
                      <input
                        type="text"
                        placeholder={this.props.name}
                        onChange={this.nameChangeHandler2}
                      />
                    </div>
                    <div className="required  field">
                      <label>Year of Birth</label>
                      <input type="Year" placeholder={this.props.yob} onChange={this.yOBChangeHandler2}/>
                    </div>
                    <div className="required field">
                      <label>Year of Death</label>
                      <input type="Year" placeholder={this.props.yod} onChange={this.yODChangeHandler2}/>
                    </div>
                    <div className="required field">
                      <label>Memoriam</label>
                      <input type="text" placeholder={this.props.memoriam} onChange={this.memoriamChangeHandler2}/>
                    </div>
                  </div>
                  <button onClick={this.onClickUpdateGrave} type="submit" className="ui submit button">Submit</button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
};

export default Grave;

import React from 'react';

const OnClickAddGrave = async () => {

  //const { accounts, contract } = this.state;
  console.log("i just tried to add a hamster");
  //const testAddGrave = await contract.methods.addHamsterGrave('totoro', 1, 2, 'RIP').call();
}

const AddGraveButton = props => {
  return (
    <div className="column">
      <div className="small ui card">
        <div className="content">
          <a className="header">Add Hamster</a>
        </div>
        <br></br>
        <br></br>
        <button onClick={this.OnClickAddGrave()}className="ui icon button">
          <i aria-hidden="true" className="huge plus circle icon"></i>
        </button>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default AddGraveButton;

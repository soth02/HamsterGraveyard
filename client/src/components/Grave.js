import React from 'react';


const Grave = (props) => {

  return (
    <div className="column">
      <div className="small ui card">
        <div className="image">
          <img alt='' src="./hamster_100x100.png" className="visible content"/>
        </div>
        <div className="content">
          <a className="header">{props.name}</a>
          <div className="description">
          {props.yob}-{props.yod}
          </div>
        </div>
        <div className="extra content">
          <a>
            {props.memoriam}
          </a>
        </div>
        <button>update {props.hamsterGraveNum}</button>
      </div>
    </div>
  );
};

export default Grave;

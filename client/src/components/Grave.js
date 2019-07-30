import React from 'react';

const Grave = () => {
  return (
    <div className="small ui card">
      <div className="image">
        <img src="./hamster_100x100.png" className="visible content"/>
      </div>
      <div className="content">
        <a className="header">Hammy</a>
        <div className="description">
        2001-2003
        </div>
      </div>
      <div className="extra content">
        <a>
          RIP
        </a>
      </div>
    </div>
  );
};

export default Grave;

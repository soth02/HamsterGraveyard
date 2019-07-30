import React from 'react';

const GraveForm = () => {
  return (
    <div className="ui grid">
      <div className="ui form">
        <h1>Add a Hamster grave </h1>
        <div className="grouped fields">
          <div className="required field">
            <label>Name</label>
            <input type="text" placeholder="Hammy" />
          </div>
          <div className="required  field">
            <label>Year of Birth</label>
            <input type="text" placeholder="2018" />
          </div>
          <div className="required field">
            <label>Year of Death</label>
            <input type="text" placeholder="2019" />
          </div>
          <div className="required field">
            <label>Memoriam</label>
            <input type="text" placeholder="RIP" />
          </div>
        </div>
        <div class="ui submit button">Submit</div>
      </div>
    </div>
  );
};

export default GraveForm;

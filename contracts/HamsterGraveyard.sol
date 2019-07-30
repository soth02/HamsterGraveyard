pragma solidity ^0.5.0;

contract HamsterGraveyard {

    address payable public owner = msg.sender;

    /*
        Create a variable to keep track of the event ID numbers.
    */
    uint public idGenerator = 0;

    struct HamsterGrave {
      string name;
      uint yearOfBirth;
      uint yearOfDeath;

      //limit to 100 characters
      string memoriam;
    }

    mapping (address => mapping (uint => HamsterGrave)) public owners;


    event LogHamsterGraveAdded(uint hamsterGraveNum, string name, uint yearOfBirth, uint yearOfDeath, string memoriam);
    event LogHamsterGraveUpdated(uint hamsterGraveNum, string name, uint yearOfBirth, uint yearOfDeath, string memoriam);

    constructor () public {
        owner = msg.sender;
    }

    function getIdGenerator() view public returns (uint){
      return (idGenerator);
    }

    //
    function addHamsterGrave (string memory name, uint yearOfBirth, uint yearOfDeath, string memory memoriam ) public
        returns (uint) {

	      require(yearOfDeath >= yearOfBirth);

        owners[msg.sender][idGenerator].name = name;
        owners[msg.sender][idGenerator].yearOfBirth = yearOfBirth;
        owners[msg.sender][idGenerator].yearOfDeath = yearOfDeath;
        owners[msg.sender][idGenerator].memoriam = memoriam;

        emit LogHamsterGraveAdded(idGenerator, name, yearOfBirth, yearOfDeath, memoriam);

	      idGenerator += 1;

	      return (idGenerator-1);
    }

    //update the dog info
    function updateHamsterGrave (uint hamsterGraveNum, string memory name, uint yearOfBirth, uint yearOfDeath, string memory memoriam ) public
        returns (uint) {

        owners[msg.sender][hamsterGraveNum].name = name;
        owners[msg.sender][hamsterGraveNum].yearOfBirth = yearOfBirth;
        owners[msg.sender][hamsterGraveNum].yearOfDeath = yearOfDeath;
        owners[msg.sender][hamsterGraveNum].memoriam = memoriam;

        emit LogHamsterGraveUpdated(hamsterGraveNum, name, yearOfBirth, yearOfDeath, memoriam);

	      return (hamsterGraveNum);
    }

    //
    function viewHamsterGrave (uint hamsterGraveNum) view public
	  returns (string memory name, uint yearOfBirth, uint yearOfDeath, string memory memoriam) {

      name = owners[msg.sender][hamsterGraveNum].name;
      yearOfBirth = owners[msg.sender][hamsterGraveNum].yearOfBirth;
      yearOfDeath = owners[msg.sender][hamsterGraveNum].yearOfDeath;
      memoriam = owners[msg.sender][hamsterGraveNum].memoriam;

      return(name, yearOfBirth, yearOfDeath, memoriam);
    }


}

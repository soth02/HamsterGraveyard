pragma solidity ^0.5.0;

import "../installed_contracts/Ownable.sol";
import "../installed_contracts/Pausable.sol";

///@title A virtual graveyard for beloved hamsters
///@author Soth02
///@notice Use this contract at your own risk!  It has not been professionally audited for security.
contract HamsterGraveyard is Ownable, Pausable {


    ///    Create a variable to keep track of the hamsterGrave ID numbers.
    uint public idGenerator = 0;

    /// this is the main data structure for instantiated a single hamster memorial.  The front end UI will display this information.
    struct HamsterGrave {
      string name;

      /// should validate these for valid years.  This input validation can be done on the front end as well.
      uint yearOfBirth;
      uint yearOfDeath;

      /// limit to 100 characters
      string memoriam;
      bool isCreated;
    }

    /// owners stores a mapping of individual owner addresses to
    mapping (address => mapping (uint => HamsterGrave)) public owners;

    modifier isPetOwner(address _address, uint hamsterGraveNum){
      require( owners[msg.sender][hamsterGraveNum].isCreated == true);
      _;
     }

    event LogHamsterGraveAdded(uint hamsterGraveNum, string name, uint yearOfBirth, uint yearOfDeath, string memoriam);
    event LogHamsterGraveUpdated(uint hamsterGraveNum, string name, uint yearOfBirth, uint yearOfDeath, string memoriam);

    function getIdGenerator() view public returns (uint){
      return (idGenerator);
    }

    ///
    function addHamsterGrave (string memory name, uint yearOfBirth, uint yearOfDeath, string memory memoriam ) public whenNotPaused
        returns (uint) {

	      require(yearOfDeath >= yearOfBirth);

        owners[msg.sender][idGenerator].name = name;
        owners[msg.sender][idGenerator].yearOfBirth = yearOfBirth;
        owners[msg.sender][idGenerator].yearOfDeath = yearOfDeath;
        owners[msg.sender][idGenerator].memoriam = memoriam;
        owners[msg.sender][idGenerator].isCreated = true;

        emit LogHamsterGraveAdded(idGenerator, name, yearOfBirth, yearOfDeath, memoriam);

	      idGenerator += 1;

	      return (idGenerator-1);
    }

    ///update the HamsterGrave info
    function updateHamsterGrave (uint hamsterGraveNum, string memory name, uint yearOfBirth, uint yearOfDeath, string memory memoriam ) public whenNotPaused isPetOwner(msg.sender, hamsterGraveNum)
        returns (uint) {

        owners[msg.sender][hamsterGraveNum].name = name;
        owners[msg.sender][hamsterGraveNum].yearOfBirth = yearOfBirth;
        owners[msg.sender][hamsterGraveNum].yearOfDeath = yearOfDeath;
        owners[msg.sender][hamsterGraveNum].memoriam = memoriam;

        emit LogHamsterGraveUpdated(hamsterGraveNum, name, yearOfBirth, yearOfDeath, memoriam);

	      return (hamsterGraveNum);
    }

    ///
    function viewHamsterGrave (uint hamsterGraveNum) view public
	  returns (string memory name, uint yearOfBirth, uint yearOfDeath, string memory memoriam) {

      name = owners[msg.sender][hamsterGraveNum].name;
      yearOfBirth = owners[msg.sender][hamsterGraveNum].yearOfBirth;
      yearOfDeath = owners[msg.sender][hamsterGraveNum].yearOfDeath;
      memoriam = owners[msg.sender][hamsterGraveNum].memoriam;

      return(name, yearOfBirth, yearOfDeath, memoriam);
    }


}

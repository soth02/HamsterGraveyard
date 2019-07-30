pragma solidity ^0.5.0;

import "../installed_contracts/Ownable.sol";
import "../installed_contracts/Pausable.sol";

///@title A personal virtual graveyard for beloved hamsters.
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

      /// limit memorium to 100 characters.  Might have to do this on front end?
      string memoriam;
      bool isCreated;
    }

    /// graves is an mapping of HamsterGrave structs
    mapping (uint => HamsterGrave) public graves;

    ///events
    event LogHamsterGraveAdded(uint hamsterGraveNum, string name, uint yearOfBirth, uint yearOfDeath, string memoriam);
    event LogHamsterGraveUpdated(uint hamsterGraveNum, string name, uint yearOfBirth, uint yearOfDeath, string memoriam);

    ///possibly superfluous getter function
    function getIdGenerator() view public returns (uint){
      return (idGenerator);
    }

    /// allows the owner to add new memorials
    function addHamsterGrave (string memory name, uint yearOfBirth, uint yearOfDeath, string memory memoriam ) public whenNotPaused() onlyOwner()
        returns (uint) {

	      require(yearOfDeath >= yearOfBirth);

        graves[idGenerator].isCreated = true;
        graves[idGenerator].name = name;
        graves[idGenerator].yearOfBirth = yearOfBirth;
        graves[idGenerator].yearOfDeath = yearOfDeath;
        graves[idGenerator].memoriam = memoriam;

        emit LogHamsterGraveAdded(idGenerator, name, yearOfBirth, yearOfDeath, memoriam);

	      idGenerator += 1;

	      return (idGenerator-1);
    }

    /// allows the owner to update the HamsterGrave info
    function updateHamsterGrave (uint hamsterGraveNum, string memory name, uint yearOfBirth, uint yearOfDeath, string memory memoriam ) public whenNotPaused()  onlyOwner()
        returns (uint) {

        graves[hamsterGraveNum].name = name;
        graves[hamsterGraveNum].yearOfBirth = yearOfBirth;
        graves[hamsterGraveNum].yearOfDeath = yearOfDeath;
        graves[hamsterGraveNum].memoriam = memoriam;

        emit LogHamsterGraveUpdated(hamsterGraveNum, name, yearOfBirth, yearOfDeath, memoriam);

	      return (hamsterGraveNum);
    }

    /// allows anyone to view the owner's hamster graveyard
    function viewHamsterGrave (uint hamsterGraveNum) view public
	  returns (string memory name, uint yearOfBirth, uint yearOfDeath, string memory memoriam) {

      name = graves[hamsterGraveNum].name;
      yearOfBirth = graves[hamsterGraveNum].yearOfBirth;
      yearOfDeath = graves[hamsterGraveNum].yearOfDeath;
      memoriam = graves[hamsterGraveNum].memoriam;

      return(name, yearOfBirth, yearOfDeath, memoriam);
    }


}

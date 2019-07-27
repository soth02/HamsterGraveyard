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
    
    constructor () public {
        owner = msg.sender;
    }
       
    //
    function addHamsterGrave (string memory name, uint yearOfBirth, uint yearOfDeath, string memory memoriam ) payable public
        returns (uint hamsterGraveNum) {

	require(yearOfDeath <= yearOfBirth);

        owners[msg.sender][idGenerator].name = name;
        owners[msg.sender][idGenerator].yearOfBirth = yearOfBirth;
        owners[msg.sender][idGenerator].yearOfDeath = yearOfDeath;
        owners[msg.sender][idGenerator].memoriam = memoriam;

	idGenerator += 1;
        
	return (idGenerator-1);
    }
    
    //update the dog info
    function updateHamsterGrave (uint hamsterGraveNum, string memory name, uint yearOfBirth, uint yearOfDeath, string memory memoriam ) public
        returns (uint) {

        owners[msg.sender][idGenerator].name = name;
        owners[msg.sender][idGenerator].yearOfBirth = yearOfBirth;
        owners[msg.sender][idGenerator].yearOfDeath = yearOfDeath;
        owners[msg.sender][idGenerator].memoriam = memoriam;
      
	return (hamsterGraveNum);
    }
    
    //
    function viewHamsterGrave (uint hamsterGraveNum) view public 
	returns (string memory, uint, uint, string memory) {

        return(owners[msg.sender][hamsterGraveNum].name, owners[msg.sender][hamsterGraveNum].yearOfBirth, owners[msg.sender][hamsterGraveNum].yearOfDeath, owners[msg.sender][hamsterGraveNum].memoriam);
    }


}


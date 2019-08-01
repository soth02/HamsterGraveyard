# Design Patterns Used

## Circuit Breaker

I used OpenZeppelin's Pausable.sol library to implement a Circuit Breaker design pattern.  In the event that there is an issue with my contract, it can be paused.

## Ownable

I used OpenZeppelin's Ownable.sol library to implement the Ownable design pattern.  It allows the contract to be controlled by the owner.  I would not want external parties to deface my hamster graveyard.

## Design Patterns not Used

If I had more time, I would have implemented more input validation a la the **Fail Early and Fail Loud** pattern.  The inputs to hamster grave creation could be restricted and validated on both the contract and front end ui.



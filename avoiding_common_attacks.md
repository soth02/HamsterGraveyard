# Avoiding Common Attacks

My contract is simple with only a few functions and it is only alterable by the owner.  It was designed to be simple so that the front end UI would not be complex to implement.  That said, what I have learned is that the intended purpose of a contract can be heavily altered by anyone who implements a UI for said contract.  Using my contract as an example, I intended to create an online memorial for hamsters, however there is no inherent limitation for hamsters in the code.  A website could re-skin my UI to create a memorial for dogs, cats, or even humans.

The true attacks against my simple contract are not really of the 'attack the code' nature.  Where my contract fails, and where other similar classes of contracts can fail, is in protecting against malicious content attacks.  I can validate string length maxes and dates all I want.  A user could upload illegal content (technology export restricted or abuse content for example) and there would be no way to take it down.  Yes, in my particular instance, no other user *should* be able to modify content except for the owner.  However, in the initial implementation of my contract, there were multiple owners, and only the owner could modify their own content.

Implementing **Pausable** and **Ownable** design patterns does go some ways in moderating who and when they can use the contract.  However, without a **Mortal** implementation, there could be content that is impossible to remove from the Ethereum blockchain if `updateHamsterGrave()` fails.  Note that the original intent of the contract was for a *permanent* online memorial, which is why there is no **Mortal** design pattern.

## Reentrancy attacks, Doesn't take any ether

My contract does not have any `payable` functions, so I am less concerned about attacks which affect ether balances.

## Gas limits

My contract does have a deficiency in that there should be more input validation for strings.  With no max length for the hamster name or memoriam, you can run out of gas when running the contract.  I am not sure how this would be used as an attack however. I suppose you would create an `addHamsterGrave()` transaction that is very close to the gas limit when adding all the strings and uints together.  Then you might fail to be able to update the grave via `updateHamsterGrave()` if that takes you over max gas allowed.  This would create an attack vector of illegal content.


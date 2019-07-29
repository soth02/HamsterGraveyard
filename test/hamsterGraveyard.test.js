const HamsterGraveyard = artifacts.require("./HamsterGraveyard.sol");
const BN = web3.utils.BN;

contract("HamsterGraveyard", accounts => {


  const owner = accounts[0];
  const name = "totoro";
  const yob = 2001;
  const yod = 2002;
  const memoriam = "RIP";

  it("idGenerator should be iterated by 1.", async () => {
    const hamsterGraveyardInstance = await HamsterGraveyard.deployed()

    // Set value of 89
    const idGeneratorInitial = await hamsterGraveyardInstance.getIdGenerator.call();
    const mynum = idGeneratorInitial.toNumber()+1;

    const idGeneratorNext = await hamsterGraveyardInstance.addHamsterGrave(name, yob, yod, memoriam);

    //console.log(idGeneratorNext);

    assert.equal(mynum+1, idGeneratorNext, "idGeneratorInitial+1 should equal idGeneratorNext.");
  })
})

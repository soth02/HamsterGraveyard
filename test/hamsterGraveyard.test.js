const HamsterGraveyard = artifacts.require("./HamsterGraveyard.sol");
const BN = web3.utils.BN;

contract("HamsterGraveyard", accounts => {


  const owner = accounts[0];
  const name = "totoro";
  const yob = 2001;
  const yod = 2002;
  const memoriam = "RIP";

  beforeEach(async () => {
    instance = await HamsterGraveyard.new();
  })

  it("idGenerator should be iterated by 1 after addHamsterGrave is called.", async () => {

    const idGeneratorInitial = await instance.getIdGenerator.call();
    await instance.addHamsterGrave(name, yob, yod, memoriam);
    const idGeneratorNext = await instance.getIdGenerator.call();
    assert.equal(idGeneratorInitial.toNumber()+1, idGeneratorNext.toNumber(), "idGeneratorInitial+1 should equal idGeneratorNext.");
  })

  it("the id of an added HamsterGrave should set to idGenerator.", async () => {

    const idGeneratorInitial = await instance.getIdGenerator.call();
    const tx = await instance.addHamsterGrave(name, yob, yod, memoriam);
    const graveData = tx.logs[0].args;

    assert.equal(idGeneratorInitial.toNumber(), graveData.hamsterGraveNum.toNumber(), "idGeneratorInitial should equal the hamsterGraveNum.");
  })

  it("adding a hamsterGrave should emit an event with the provided details.", async () => {

    const tx = await instance.addHamsterGrave(name, yob, yod, memoriam);
    const graveData = tx.logs[0].args;

    assert.equal(name, graveData.name, "the added name should match");
    assert.equal(yob, graveData.yearOfBirth, "the added yearOfBirth should match");
    assert.equal(yod, graveData.yearOfDeath, "the added yearOfDeath should match");
    assert.equal(memoriam, graveData.memoriam, "the added memoriam should match");
  })

  it("updating a hamsterGrave should change the values for a hamsterGrave", async () => {

    const tx = await instance.addHamsterGrave(name, yob, yod, memoriam);
    const graveData = tx.logs[0].args;

    const tx2 = await instance.updateHamsterGrave(graveData.hamsterGraveNum,'Hammy', 2003, 2004, 'later');
    const updatedGraveData = tx2.logs[0].args;

    assert.notEqual(graveData.name, updatedGraveData.name, "the updated name should be changed");
    assert.notEqual(graveData.yearOfBirth.toNumber(), updatedGraveData.yearOfBirth.toNumber(), "the updated yearOfBirth should be changed");
    assert.notEqual(graveData.yearOfDeath.toNumber(), updatedGraveData.yearOfDeath.toNumber(),"the updated yearOfDeath should be changed");
    assert.notEqual(graveData.memoriam, updatedGraveData.memoriam,"the updated memoriam should be changed");
  })

  it("viewing a hamsterGrave should correctly return its values", async () => {

    const tx = await instance.addHamsterGrave(name, yob, yod, memoriam);
    const graveData = tx.logs[0].args;

    const response = await instance.viewHamsterGrave(graveData.hamsterGraveNum.toNumber());

    assert.equal(graveData.name, response.name, "the viewed name should be equal to the added name");
    assert.equal(graveData.yearOfBirth.toNumber(), response.yearOfBirth.toNumber(), "the viewed yearOfBirth should be equal to the added YOB");
    assert.equal(graveData.yearOfDeath.toNumber(), response.yearOfDeath.toNumber(),"the viewed yearOfDeath should be equal to the added YOD");
    assert.equal(graveData.memoriam, response.memoriam,"the viewed memoriam should be equal to the added Memoriam");




  })

})

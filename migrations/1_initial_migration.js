const Migrations = artifacts.require("Migrations");
const DaiTokenMock = artifacts.require("DaiTokenMock");
const Messenger = artifacts.require("Messenger");
const User2Contract = artifacts.require("User2Contract");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(DaiTokenMock);
  await deployer.deploy(Messenger);
  await deployer.deploy(User2Contract);

  const messenger = await Messenger.deploy();
  const user2Contract = await User2Contract.deploy();

  const tokenMock = await DaiTokenMock.deployed()
  // Mint 1,000 Dai Tokens for the deployer
  await tokenMock.mint(
    '0x23711fF3eD42a36b2b70276Adc4deA19f72d2AEC',
    '1000000000000000000000'
  )
};

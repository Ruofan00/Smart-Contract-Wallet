// const Migrations = artifacts.require("Migrations");
const Messenger = artifacts.require("Messenger");
const RecoverTools = artifacts.require("RecoverTools");
const User2Contract = artifacts.require("User2Contract");
const Migrations = artifacts.require("Migrations");
module.exports = async function(deployer) {
  // await deployer.deploy(Migrations);
  await deployer.deploy(Migrations);
  await deployer.deploy(Messenger,["0x5D414BD62a2086f5a63bb4B2a7E109CF4f3f1269","0x21346624FA6764762C0d215139d560A17Ea074dd","0xfED95d4B24D55879876A34B2338ab2B621E0cce6"],2);
  // await deployer.deploy(RecoverTools);
  await deployer.deploy(User2Contract);
  await deployer.deploy(RecoverTools);

  // const M = await Messenger.deployed();
  // const R = await RecoverTools.deployed();
  // const U = await User2Contract.deployed();
  // const R = await RecoverTools.deployed();
  // Mint 1,000 Dai Tokens for the deployer
  // await tokenMock.mint(
  //   '0xB3D3bECE10BCF6d2bda5B1E9d1fA0B7483b36E6e',
  //   '1000000000000000000000'
  // )
};

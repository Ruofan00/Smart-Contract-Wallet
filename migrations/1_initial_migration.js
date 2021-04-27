// const Migrations = artifacts.require("Migrations");
const Messenger = artifacts.require("User");
const RecoverTools = artifacts.require("RecoverTools");
const User2Contract = artifacts.require("User2Contract");
const Migrations = artifacts.require("Migrations");
const Web3 = require('web3');
module.exports = async function(deployer) {
  // await deployer.deploy(Migrations);
  await deployer.deploy(Migrations);

  //await deployer.deploy(Messenger,["0x5D414BD62a2086f5a63bb4B2a7E109CF4f3f1269","0x21346624FA6764762C0d215139d560A17Ea074dd","0xfED95d4B24D55879876A34B2338ab2B621E0cce6"],2);
  // await deployer.deploy(RecoverTools);

  const web3 = new Web3(Web3.currentProvider);
// web3.eth.getAccounts(function(acc){
//   account = acc[0];
// })
  // web3.eth.getCoinbase(async function(err,acc) {
  //   if(err==null) {
    acc = "0x902fd7E8A8bD54bE466407065E9bA2F973664381";
    await deployer.deploy(Messenger,acc,0);
     // console.log("current account",acc);
    await deployer.deploy(User2Contract);
    await deployer.deploy(RecoverTools);
   // }
  // });
  
  // const tokenMock = await Messenger.deployed();
  // await tokenMock.mint(
  //   '0x5D414BD62a2086f5a63bb4B2a7E109CF4f3f1269',
  //   '1000000000000000000000'
  // )
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

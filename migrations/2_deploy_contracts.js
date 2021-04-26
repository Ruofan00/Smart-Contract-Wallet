const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')
const Messenger = artifacts.require('Messenger')
const User2Contract = artifacts.require('User2Contract')

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // Deploy Dapp Token
  await deployer.deploy(DappToken)
  const dappToken = await DappToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
  const tokenFarm = await TokenFarm.deployed()


  await deployer.deploy(Messenger,accounts,2);
  const messenger = await Messenger.deployed();

  // await deployer.deploy(User2Contract)
  // const user2Contract = await User2Contract.deployed();

  // Transfer all tokens to TokenFarm (1 million)
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

  // Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[1], '100000000000000000000')
}

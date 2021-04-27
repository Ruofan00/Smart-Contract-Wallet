require('babel-register');
require('babel-polyfill');
//import Web3 from 'web3';
// const Web3 = require('web3');
// var account;
// const web3 = new Web3(Web3.currentProvider);
// // web3.eth.getAccounts(function(acc){
// //   account = acc[0];
// // })
// web3.eth.getCoinbase(function(err,acc) {
//   if(err==null) {
//     account = acc;
//   }

// });


module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777", // Match any network id
      from: "0x902fd7E8A8bD54bE466407065E9bA2F973664381"
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version:'0.8.4',
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}

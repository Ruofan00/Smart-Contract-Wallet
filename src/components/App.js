// import React, { Component } from 'react'
// import Web3 from 'web3'
// import DaiToken from '../abis/DaiToken.json'
// import DappToken from '../abis/DappToken.json'
// import TokenFarm from '../abis/TokenFarm.json'
import Navbar from './Navbar';
import eth from '../eth-logo.png';
// import Main from './Main'


// class App extends Component {

//   async componentWillMount() {
//     await this.loadWeb3()
//     await this.loadBlockchainData()
//   }

//   async loadBlockchainData() {
//     const web3 = window.web3

//     const accounts = await web3.eth.getAccounts()
//     this.setState({ account: accounts[0] })

//     const networkId = await web3.eth.net.getId()

//     // Load DaiToken
//     const daiTokenData = DaiToken.networks[networkId]
//     if(daiTokenData) {
//       const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
//       this.setState({ daiToken })
//       let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
//       this.setState({ daiTokenBalance: daiTokenBalance.toString() })
//     } else {
//       window.alert('DaiToken contract not deployed to detected network.')
//     }

//     // Load DappToken
//     const dappTokenData = DappToken.networks[networkId]
//     if(dappTokenData) {
//       const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
//       this.setState({ dappToken })
//       let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call()
//       this.setState({ dappTokenBalance: dappTokenBalance.toString() })
//     } else {
//       window.alert('DappToken contract not deployed to detected network.')
//     }

//     // Load TokenFarm
//     const tokenFarmData = TokenFarm.networks[networkId]
//     if(tokenFarmData) {
//       const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
//       this.setState({ tokenFarm })
//       let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
//       this.setState({ stakingBalance: stakingBalance.toString() })
//     } else {
//       window.alert('TokenFarm contract not deployed to detected network.')
//     }

//     this.setState({ loading: false })
//   }

//   async loadWeb3() {
//     if (window.ethereum) {
//       window.web3 = new Web3(window.ethereum)
//       await window.ethereum.enable()
//     }
//     else if (window.web3) {
//       window.web3 = new Web3(window.web3.currentProvider)
//     }
//     else {
//       window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
//     }
//   }

//   stakeTokens = (amount) => {
//     this.setState({ loading: true })
//     this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
//       this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
//         this.setState({ loading: false })
//       })
//     })
//   }

//   unstakeTokens = (amount) => {
//     this.setState({ loading: true })
//     this.state.tokenFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
//       this.setState({ loading: false })
//     })
//   }

//   constructor(props) {
//     super(props)
//     this.state = {
//       account: '0x0',
//       daiToken: {},
//       dappToken: {},
//       tokenFarm: {},
//       daiTokenBalance: '0',
//       dappTokenBalance: '0',
//       stakingBalance: '0',
//       loading: true
//     }
//   }

//   render() {
//     let content
//     if(this.state.loading) {
//       content = <p id="loader" className="text-center">Loading...</p>
//     } else {
//       content = <Main
//         daiTokenBalance={this.state.daiTokenBalance}
//         dappTokenBalance={this.state.dappTokenBalance}
//         stakingBalance={this.state.stakingBalance}
//         stakeTokens={this.stakeTokens}
//         unstakeTokens={this.unstakeTokens}
//       />
//     }

//     return (
//       <div>
//         <Navbar account={this.state.account} />
//         <div className="container-fluid mt-5">
//           <div className="row">
//             <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
//               <div className="content mr-auto ml-auto">
//                 <a
//                   href="http://www.dappuniversity.com/bootcamp"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                 </a>

//                 {content}

//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
import React, { Component } from 'react';
// import daiLogo from '../dai-logo.png';
import './App.css';
import Web3 from 'web3';

// import DaiTokenMock from '../abis/DaiTokenMock.json'
import User2Contract from '../abis/User2Contract.json'
import RecoverTools from '../abis/RecoverTools.json'
import Messenger from '../abis/Messenger.json'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      balance: 0,
      myMessenger: null,
      transactions: []
    }

    this.transfer = this.transfer.bind(this)
    this.loadBlockchainData = this.loadBlockchainData.bind(this)
    
  }
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  //connect to blockchain
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }



  //interact with smart contract
  async loadBlockchainData() {

    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // const daiTokenAddress = "0x7b729B07EcBDEd8879Acf997aAF6546926982830" // Replace DAI Address Here  
    
    
    var MyContract = new web3.eth.Contract(User2Contract.abi,"0x48d65C30f7e13420410a4a22785Ad8467e7D4494");
    MyContract.methods.getMessenger(accounts[0]).call().then(function(MyMessenger){
      console.log("contract address",MyMessenger);
    });
    
    console.log("User2Contract address",MyContract);
    // console.log(this.state.account);
    // var data = await MyContract.methods.getMessenger("0x5D414BD62a2086f5a63bb4B2a7E109CF4f3f1269").call();
    // console.log(data);
    var messenger = new web3.eth.Contract(Messenger.abi,myMessenger);
    this.setState({myMessenger:messenger});
    console.log(this.state.myMessenger);
    const balance = await messenger.methods.getBalance().call();
    console.log(balance);
    this.setState({ balance: web3.utils.fromWei(balance.toString(), 'Ether') });
    
    const transactions = await messenger.getPastEvents('Transfer',{fromBlock:0,toBlock:'latest',filter:{from:this.state.account}});
    this.setState({transactions:transactions});


    
    // MyContract.methods.getMessenger(this.state.account).call().then(function(data){

    // })
    // const daiTokenMock = new web3.eth.Contract(DaiTokenMock.abi, daiTokenAddress)
    // this.setState({ daiTokenMock: daiTokenMock })
    // const balance = await daiTokenMock.methods.balanceOf(this.state.account).call()
    // this.setState({ balance: web3.utils.fromWei(balance.toString(), 'Ether') })
    // const transactions = await daiTokenMock.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest', filter: { from: this.state.account } })
    // this.setState({ transactions: transactions })
    // console.log(transactions)
  }

  transfer(recipient, amount) {
    this.state.myMessenger.methods.transfer(recipient, amount).send({ from: this.state.account })
  }


  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto" style={{ width: "500px" }}>
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={eth} width="150" />
                </a>
                <h1>{this.state.balance} ETH</h1>
                <form onSubmit={(event) => {

                  event.preventDefault()
                  console.log(this.amount.value);
                  const recipient = this.recipient.value
                  // const amount = window.web3.utils.fromWei(this.amount.value);
                  const amount = window.web3.utils.toWei(this.amount.value, 'Ether')
                  this.transfer(recipient,this.amount.value);
                }}>
                  <div className="form-group mr-sm-2">
                    <input
                      id="recipient"
                      type="text"
                      ref={(input) => { this.recipient = input }}
                      className="form-control"
                      placeholder="Recipient Address"
                      required />
                  </div>
                  <div className="form-group mr-sm-2">
                    <input
                      id="amount"
                      type="text"
                      ref={(input) => { this.amount = input }}
                      className="form-control"
                      placeholder="Amount"
                      required />
                  </div>
                  <button type="submit" style = {{border:"0",color:"white",backgroundColor:"rgb(221, 160, 221)"}} className="btn btn-block">Send</button>
                  <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              onClick={(event) => {
                event.preventDefault()
                this.props.unstakeTokens()
              }}>
                WITHDRAW...
              </button>
                </form>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Recipient</th>
                      <th scope="col">value</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.state.transactions.map((tx, key) => {
                      return (
                        <tr key={key} >
                          <td>{tx.returnValues.to}</td>
                          <td>{window.web3.utils.fromWei(tx.returnValues.value.toString(), 'Ether')}</td>
                          <td>Recover</td>
                        </tr>
                      )
                    }) }
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import Navbar from './Navbar';
import eth from '../eth-logo.png';

import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';

// import DaiTokenMock from '../abis/DaiTokenMock.json'
// import User2Contract from '../abis/User2Contract.json'
// import RecoverTools from '../abis/RecoverTools.json'
// import Messenger from '../abis/Messenger.json'
import User from '../abis/User.json'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // wallet account
      amount:"",
      account: '',
      balance: 0,
      myMessenger: null,
      transactions: [],
      myContract: null,
      address:null,
      recipient:"",
      trans_amount:"",
    }
    this.transfer = this.transfer.bind(this);
    this.loadBlockchainData = this.loadBlockchainData.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleRecipientChange = this.handleRecipientChange.bind(this);
    this.handleTransAmountChange = this.handleTransAmountChange.bind(this);
    
  }
  async componentDidMount() {
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
    console.log(accounts);
 
   // var messenger = "0xC99e38A8FC4B84FC675C49850e0C055dfB33DBB2";
    var messenger = "0x92FC6c485050D9575A9CbD6984685aDc1aC337Ab"

    // current contract account
    this.setState({address:messenger});
   
    
    var userFunction = new web3.eth.Contract(User,messenger);

    //

    // current messenger
    this.setState({myMessenger:userFunction});
    
  
    const balance = await this.state.myMessenger.methods.getBalance().call();
    console.log(balance);
    
    this.setState({ balance: web3.utils.fromWei(balance.toString(), 'Ether')});

    const transactions = await userFunction.getPastEvents('Debit', { fromBlock: 0, toBlock: 'latest', filter: { from: this.state.address } })
    this.setState({ transactions: transactions })
    console.log(transactions)
   
  }

  //recipient address => wallet account

  async deposit(e) {
    const amount = window.web3.utils.toWei(this.state.amount,'Ether');
    console.log(this.state.account);
    await this.state.myMessenger.methods.deposit().send({
      // from: this.state.account,
      from: this.state.account,
      value: amount,
    })
    const depositBalance = await this.state.myMessenger.methods.getBalance().call();
    
    this.setState({ balance: window.web3.utils.fromWei(depositBalance.toString(), 'Ether')});
    this.setState({amount:""})
  }
  // async sendDeposit(amount){
  //   .then(async function send(res){
  //      this.setState({balance:0})
  //   })
  // }

  async transfer() {
    console.log(this.state.myMessenger);
    
    //0x902fd7E8A8bD54bE466407065E9bA2F973664381
    // window.web3.utils.toWei(_amountthis.amount.value, 'Ether')
    // console.log("transfer",_amount);
    const transamount = window.web3.utils.toWei(this.state.trans_amount,'Ether');
    console.log(transamount);
    
    await this.state.myMessenger.methods.debit(this.state.recipient,transamount)
    .send({
      from: this.state.account,
    });
    const transferBalance = await this.state.myMessenger.methods.getBalance().call();
    
    this.setState({ balance: window.web3.utils.fromWei(transferBalance.toString(), 'Ether')});
    this.setState({trans_amount:""});
    this.setState({recipient:""});
    const transfer_transactions = await this.state.myMessenger.getPastEvents('Debit', { fromBlock: 0, toBlock: 'latest', filter: { from: this.state.address } })
    this.setState({ transactions: transfer_transactions })

  }
 async withdraw(){
   await this.state.myMessenger.methods.withdraw().send(
      {from:this.state.account}
    );
    const withdrawBalance = await this.state.myMessenger.methods.getBalance().call();
    
    this.setState({ balance: window.web3.utils.fromWei(withdrawBalance.toString(), 'Ether')});
   //.then(console.log("withdraw success"));
 }

 async getBalance() {
    const balance = await this.state.myMessenger.methods.getBalance().call();
    console.log(balance);

  // this.setState({ balance: web3.utils.fromWei(balance.toString(), 'Ether') });
 }

 handleAmountChange(e) {
  this.setState({amount:e.target.value});
 }
 handleRecipientChange(e) {
  this.setState({recipient:e.target.value});
 }
 handleTransAmountChange(e) {
  this.setState({trans_amount:e.target.value});
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
                <div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  //console.log(this.target);
                  // const recipient = this.recipient.value
                  // const amount = window.web3.utils.fromWei(this.amount.value);
                  //const amount = window.web3.utils.toWei(this.amount.value, 'Ether')
                 // const amount = this.amount.value;
                  this.deposit(e);
                }}>
                  {/* <div className="form-group mr-sm-2">
                    <input
                      id="recipient"
                      type="text"
                      ref={(input) => { this.recipient = input }}
                      className="form-control"
                      placeholder="Recipient Address"
                      required />
                  </div> */}
                  <div className="form-group mr-sm-2">
                    <input
                      id="amount"
                      type="text"
                      ref={(input) => { this.amount = input }}
                      className="form-control"
                      value = {this.state.amount}
                      placeholder="Amount"
                      required onChange={this.handleAmountChange}/>
                  </div>
                  <button type="submit" style = {{border:"0",color:"white",backgroundColor:"rgb(221, 160, 221)"}} className="btn btn-block">Deposit</button>
                  <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              onClick={(event) => {
                event.preventDefault()
                this.withdraw()
              }}>
                WITHDRAW...
              </button>
              <br/>
              <br/>
                </form>
                <form onSubmit={(event) => {
                  event.preventDefault();
                  console.log(this.amount.value);
                  const recipient = this.recipient.value
                  // const amount = window.web3.utils.fromWei(this.amount.value);
                  const amount = window.web3.utils.toWei(this.amount.value, 'Ether')
                  this.transfer();
                }}>
                  <div className="form-group mr-sm-2">
                    <input
                      id="recipient"
                      type="text"
                      ref={(input) => { this.recipient = input }}
                      className="form-control"
                      placeholder="Recipient Address"
                      value = {this.state.recipient}
                      required onChange = {this.handleRecipientChange}/>
                  </div>
                  <div className="form-group mr-sm-2">
                    <input
                      id="amount"
                      type="text"
                      ref={(input) => { this.amount = input }}
                      className="form-control"
                      placeholder="Amount"
                      value = {this.state.trans_amount}
                      required onChange = {this.handleTransAmountChange}/>
                  </div>
                  <button type="submit" style = {{border:"0",color:"white",backgroundColor:"rgb(221, 160, 221)"}} className="btn btn-block">Send</button>
                  {/* <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              onClick={(event) => {
                event.preventDefault()
                this.withDraw()
              }}>
                WITHDRAW...
              </button> */}
                </form>
                </div>
              </div>
            </main>

          </div>
        </div>
        <table style={{marginLeft:"3%",marginTop:"2%"}}className="table">
                  <thead>
                    <tr>
                      <th scope="col">From</th>
                      <th scope="col">To</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.state.transactions.map((tx, key) => {
                      return (
                        <tr key={key} >
                          <td>{tx.returnValues.indexed_from}</td>
                          <td>{tx.returnValues.indexed_to}</td>
                          <td>{window.web3.utils.fromWei(tx.returnValues._value, 'Ether')} Ether</td>
                        </tr>
                      )
                    }) }
                  </tbody>
                </table>
      </div>
    );
  }
}

export default App;

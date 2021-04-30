import React, { Component } from 'react'
import wallet from '../wallet.png'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


class Navbar extends Component {



  render() {
    return (
      <nav style = {{backgroundColor:"#DDA0DD"}} className="navbar navbar-dark fixed-top flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={wallet} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp; Ethereum Wallet
        </a>
        <ul className="navbar-nav px-3">
         <a style={{color:"white"}} className="nav-item text-nowrap d-none d-sm-none d-sm-block">

           </a>
          </ul>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account" style = {{color:"white"}}>{this.props.account}</small>
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;


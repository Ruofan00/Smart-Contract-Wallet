// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
contract theSender {


     //this is an empty function to receive ether from wallet accounts using web3
     function receiverether() external payable {}

     function balanceof() public view returns (uint){ 
      return address(this).balance;
      }

     /*this will tranfer the ether stored at this contract's address to the below 
     address */
     function debit(address addr, uint value) external {
         address payable temp = payable(addr);
         temp.transfer(value);
         
     }

}

contract theReceiver{

/*this is required to receive ether from any source, this will store received ether in 
this contract's address */ 

receive() external payable{}

function balanceof() public view returns (uint){
    return address(this).balance;
}

}

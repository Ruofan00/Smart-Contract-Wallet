// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract User {
    string name;
    string password;
    address public cur_owner;
    mapping(address => string[]) public messages;
    uint cur_approval;
   // mapping(address => uint256) balances;
//    mapping(address=>string) users;
    //uint public numOfApprov;
    //RecoverTools tool;
    
    event Debit(address indexed_from, address indexed_to, uint _value);
    
    event SendMessage(address _from, address _to, string _message);
    


    constructor(address _cur_owners) {
        cur_owner = _cur_owners;
     //   numOfApprov = _numOfApprov;
    }
    
    
    function getMessages(address addr) public view returns(string[] memory) {
        return messages[addr];
    }

    function getOwner() public view returns(address) {
    	return cur_owner;
    }
    
    
    function sendMessage(address _recipient, string memory _message) public {
       // messages[_recipient].push(_message);
       User other = User(payable(_recipient));
       emit SendMessage(address(this),_recipient,_message);
       other.saveMessage(address(this),_message);
    }
    
    function saveMessage(address addr, string memory _message) public {
        messages[addr].push(_message);
    }
    
    function recover(address addr1, address addr2, address addr3) public {
        sendMessage(addr1,"recover");
        sendMessage(addr2,"recover");
        sendMessage(addr3,"recover");
    }
    
    function createNewAccount() public view returns(address) {
       // RecoverTools rc = new RecoverTools();
    //    return rc.createNewAccount(address(this));
    }
    
    function time() public view returns (uint256) {
        return block.timestamp;    
    }
    
    function getContractAddress() public view returns (address) {
        return address(this);
    }
    
    function deposit() public payable {
        
    }
    
    receive() external payable{}
    
    function debit(address addr, uint value) external {
        emit Debit(msg.sender,addr,value);
         address payable temp = payable(addr);
         temp.transfer(value);
         
     }
    
    function withdraw() public {
        uint amount = address(this).balance;
        
        (bool success,) = cur_owner.call{value:amount}("");
        require(success,"Failed to send ether");
    }

    // function sendViaTransfer(address payable _to) public payable {
    //     // This function is no longer recommended for sending Ether.
    //     _to.transfer(msg.value);
    // }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    
    function compareTo(string memory a, string memory b) public pure returns(bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    function transfer(address payable _to, uint _amount) public {
        (bool success,) = _to.call{value:_amount}("");
        require(success,"Failed to send either");
    }
    
}

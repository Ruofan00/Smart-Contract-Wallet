// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract User {
    address public cur_owner;
    mapping(address=>bool) public isOwner;
    mapping(address => string[]) messages;
    uint cur_approval;
    mapping(address => uint256) balances;
    mapping(address=>string) users;
    uint public numOfApprov;
    //RecoverTools tool;
    
    event Debit(address indexed_from, address indexed_to, uint _value);
    
    
    modifier onlyOwner() {
        require(isOwner[msg.sender],"not owner");
        _;
    }


    constructor(address _cur_owners, uint _numOfApprov) {
        cur_owner = _cur_owners;
        numOfApprov = _numOfApprov;
    }
    
    
    function getMessages() public view returns(string[] memory) {
        return messages[address(this)];
    }

    function getOwner() public view returns(address) {
        return cur_owner;
    }
    
    
    function sendMessage(address _recipient, string calldata _message) public {
        messages[_recipient].push(_message);
    }
    
    function readMessage() public {
        string[] memory message = messages[msg.sender];
        for(uint i=0;i<message.length;i++) {
            if(compareTo(message[i],"recover")) {
                cur_approval+=1;
            }
        }
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

    function sendViaTransfer(address payable _to) public payable {
        // This function is no longer recommended for sending Ether.
        _to.transfer(msg.value);
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    //function balanceOf() public 

    // function recover() public returns(address){
    //     readMessage();
    //     require(cur_approval==numOfApprov,'Need more approval');
    //    // RecoverTools tool = new RecoverTools();
    //     Messenger new_owner = tool.recover(owners,numOfApprov);
    //     transfer(payable(address(new_owner)),balances[address(this)]);
    //     return address(new_owner);
    // }
    
    function compareTo(string memory a, string memory b) public pure returns(bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    function transfer(address payable _to, uint _amount) public {
        (bool success,) = _to.call{value:_amount}("");
        require(success,"Failed to send either");
    }
    
    
}
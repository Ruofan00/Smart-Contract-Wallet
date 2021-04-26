// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;


contract Messenger {
    address[] public owners;
    address payable public cur_owner;
  //  mapping(address=>bool) public isOwner;
    mapping(address => string[]) messages;
    uint cur_approval;
    mapping(address => uint256) balances;
    mapping(address=>string) users;
    uint public numOfApprov;
    RecoverTools tool;

    // struct Transaction {
    //     address to;
    //     uint value;
    //     bytes data;
    //     bool executed;
    //     uint numOfApprov;
    // }

    // Transaction[] public transcations;

    // modifier onlyOwner() {
    //     require(isOwner[msg.sender],"not owner");
    //     _;
    // }

    constructor(address[] memory _owners, uint _numOfApprov) {
        require(_owners.length>0,'need some users');
        require(
            _numOfApprov>0 && _numOfApprov<=_owners.length,
            'need valid number of approval'
        );
        for(uint i=0;i<_owners.length;i++) {
            address owner = _owners[i];

            require(owner!=address(0),'invalid owner');
            // require(!isOwner[owner],'owner not unique');
            //tool=new RecoverTools();
           // isOwner[owner] = true;
            cur_owner = payable(msg.sender);
            owners.push(owner);

        }
        numOfApprov = _numOfApprov;
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getMessages() public view returns(string[] memory) {
        return messages[address(this)];
    }

    // function SignUp() public {

    // }

    // function SignIn(address addr, string memory username) public {

    // }

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

    function withdraw() public {
        uint amount = address(this).balance;

        (bool success,) = cur_owner.call{value:amount}("");
        require(success,"Failed to send ether");
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function recover() public returns(address){
        readMessage();
        require(cur_approval==numOfApprov,'Need more approval');
       // RecoverTools tool = new RecoverTools();
        Messenger new_owner = tool.recover(owners,numOfApprov);
        transfer(payable(address(new_owner)),balances[address(this)]);
        return address(new_owner);
    }

    function compareTo(string memory a, string memory b) public pure returns(bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    function transfer(address payable _to, uint _amount) public {

        (bool success,) = _to.call{value:_amount}("");
        require(success,"Failed to send either");
    }


}

contract RecoverTools {

    function recover(address[] memory owners, uint numOfApprov) public returns(Messenger) {
        Messenger n_contract = new Messenger(owners,numOfApprov);
        return n_contract;
    }
}

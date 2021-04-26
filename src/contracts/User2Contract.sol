// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "./Messenger.sol";

contract User2Contract {

// 	struct User{
// 		string name;
// 		Messenger account;
// 	}
	
	mapping(address=>Messenger) contracts;
	address[] public users = [0x5D414BD62a2086f5a63bb4B2a7E109CF4f3f1269,
	0x21346624FA6764762C0d215139d560A17Ea074dd,
	0xfED95d4B24D55879876A34B2338ab2B621E0cce6];
// 	"0x777181A3eF545837d48bB80067eE7006844d54cD",
// 	"0x6188876C91d60b51eEC99b8B688A507e5f519369",
// 	"0x9378c32f0793d184A8a52A2eB9e00DCE9C802272",
// 	"0x8c0acB10fe613E52220Bf6E19f4d1CD886a2E492",
// 	"0xcf6D9F08A9FA4f35A113b937a4845EaF936D7d71",
// 	"0x3F6fbcDA0e19064f33757bcF4bbB43BB87d00C91",
// 	"0xdc333Dd5935AED4a95D305B8b38bac587cB72f66"];


	function init() public returns(bool){
		for(uint i=0;i<users.length;i++) {
			Messenger temp_mess = new Messenger(users,users.length-1);
			//User newUser = User()
			contracts[users[i]] = temp_mess;
		}
		//require(contracts.length==users.length,false);
		return true;
		// Messenger messenger = new Messenger(users,users.length-1);
		// return messenger;
	}

	function getMessenger(address addr) public view returns(Messenger) {
		return contracts[addr];
	}


}
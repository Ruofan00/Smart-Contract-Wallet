// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "./Messenger.sol";

contract User2Contract {

// 	struct User{
// 		string name;
// 		Messenger account;
// 	}
	
	mapping(address=>Messenger) contracts;
	address[] public users = [0xBA7552924a31a9614c2d0615B62409a6501d6D17,
	0x902fd7E8A8bD54bE466407065E9bA2F973664381,
	0x097dB25664f937740E02c42A42A765df449de1B7];
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

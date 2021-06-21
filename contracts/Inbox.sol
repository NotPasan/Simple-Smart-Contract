pragma solidity ^0.4.17; //version of solidity

contract Inbox { //defines a new contract(basically a class)
    string public message; //instance variable 
    
    
    //functions  
    function Inbox(string initialMessage) public { //constructor function invoked automatically
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public{ 
        message = newMessage;
    }


}
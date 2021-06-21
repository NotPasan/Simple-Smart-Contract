// contract test code will go here
const assert = require ('assert');
const ganache = require ('ganache-cli');
const Web3 = require ('web3'); //constructor
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require ('../compile');
let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hello World!';
beforeEach(async()=>{
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface)) //creates a generic contract object
    .deploy({data:bytecode, arguments: [INITIAL_MESSAGE]}) // initalizes/configures a new copy of this contract for deployment
    .send({from:accounts[0], gas:'1000000'}); //sends transaction to network to deploy contract 

});


describe('Inbox', ()=>{
    it ('deploys a contract', ()=>{
        assert.ok(inbox.options.address); //checks if there is an address assigned to the contract 
    });
    
    it('has a default message', async()=>{
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, INITIAL_MESSAGE);
    });

    it('can change the message', async() =>{
        const NEW_MESSAGE = 'OwO';
        await inbox.methods.setMessage(NEW_MESSAGE).send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, NEW_MESSAGE);
    });
});
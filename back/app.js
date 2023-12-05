const {Web3} = require("web3")
const express = require("express")
const fs = require("fs")

//Provider
const provider = 'http://localhost:8580'
const web3 = new Web3(new Web3.providers.HttpProvider(provider));
//wallet
const jsonWallet = JSON.parse(fs.readFileSync("../nodes/docker-compose/files_network/keystore/UTC--2023-11-29T19-59-39.261557598Z--2104d98f2fd723443f3873a02a4f4b53899fae99"))
//console.log(jsonWallet)

//-------------------------------------------Server instance--------------------------------------------
const app = express()

//---------------------------------------------Middlewares--------------------------------------------
//app.use(...)


//-----------------------------------------------Routes--------------------------------------------

//Root
app.get("/", (req,res) =>{
    res.send("Hello I am ETP Team1 backend!!!");
})


//Get balance of account
/*	ETP A1
	0x53db8233B2448fa6003d62a51318b71aab0aDc2e

	ETP A2
	0x9fFa2c0770952f605247BdAB10108aa67A291441
*/
app.get("/balance/:address", async (req,res)=>{
    try{
        const balance = await web3.eth.getBalance(req.params.address);
        console.log(balance);
        res.send(`Balance: ${balance}`);
    }
    catch(error){
        console.log(error);
        res.status(500).send({error});
    }
});

//Get last N blocks from blockchain
app.get("/lastBlocks/:n", async (req,res)=>{

    try{
        //Retrieve last block number
        const latestBlockNumber = await web3.eth.getBlockNumber();
        console.log(`Last block number: ${latestBlockNumber} `);
        console.log(`Num blocks to retrieve: ${req.params.n} `);

        const blocks = [];
        for (let i = 0; i <req.params.n; i++) {
           
            const blockNumber = latestBlockNumber - BigInt(i);
            console.log(`Getting blockNumber: ${blockNumber}`);
            
            const block = await web3.eth.getBlock(blockNumber);
            console.log(`Retrieved blockNumber: ${blockNumber}`);

            //Convert BigInt -> unable to parse BigInt with JSON.stringify()
            const parseBlock = JSON.parse(JSON.stringify(block, (key, value) => 
                typeof value === 'bigint' ? value.toString() : value
            ));

            blocks.push(parseBlock);
        }
        
        res.send(`Blocks: ${JSON.stringify(blocks, null, 2)}`);

    }
    catch(error){
        res.status(500).send({error});
    }
});

//Get details for specific block 
app.get("/blockDetails/:blockNr", async (req,res)=>{

    try{

        console.log(`Getting block number: ${req.params.blockNr}`);

        const block = await web3.eth.getBlock(req.params.blockNr);

        //Convert BigInt -> unable to parse BigInt with JSON.stringify()
        const parseBlock = JSON.parse(JSON.stringify(block, (key, value) => 
            typeof value === 'bigint' ? value.toString() : value
        ));
    
        res.send({parseBlock});
    }
    catch(error){
        res.status(500).send({error});
    }
});

//Faucet 
app.get("/faucet/:address/:cantidad", async(req, res) => {
    const account = await web3.eth.accounts.decrypt(jsonWallet, "aaa")
    const tx = {
        chainId: 69,
        to: req.params.address,
        from: account.address,
        gas: 30000,
        value: web3.utils.toWei(req.params.cantidad, 'ether')
    }
    const txSigned = await account.signTransaction(tx);
    const respuesta= await web3.eth.sendSignedTransaction(txSigned.rawTransaction)
    res.send(respuesta)
})


//--------------------------------------------Run server--------------------------------------------
app.listen(3333)
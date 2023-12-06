const Web3 = require("web3")
const express = require("express")
const web3 = new Web3("http://localhost:8546")
const fs = require("fs")

const app = express()

app.listen(3333)
const jsonWallet = JSON.parse(fs.readFileSync("../nodes/basic_node/node_1/keystore/UTC--2023-11-27T19-12-10.798464555Z--e28e80a45e6f390c4806bca925e3d195fe030c43"))

console.log(jsonWallet)

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


app.get("/balance/:address", async(req, res) => {
    try{
        web3.eth.getBalance(req.params.address)
        .then (saldo =>{
            res.send(saldo)
        }).catch(err =>{
            res.send(err)
        })
    }catch{
        console.log("error")
    }
   
})
const { Web3 } = require("web3");
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");
const Table = require("cli-table3");
require("dotenv").config();
const KEYSTORE = process.env.KEYSTORE;
const PASSWORD = process.env.PASSWORD;

//Provider
const provider = "http://localhost:8545";
const web3 = new Web3(new Web3.providers.HttpProvider(provider));

//wallet
const jsonWallet = JSON.parse(
  fs.readFileSync(`../nodes/docker-compose/files_network/keystore/${KEYSTORE}`)
);
//console.log(jsonWallet)

//-------------------------------------------Server instance--------------------------------------------
const app = express();

//---------------------------------------------Middlewares--------------------------------------------
//app.use(...)
app.use(cors());
app.use(bodyParser.json()); // Para manejar el cuerpo de la solicitud en formato JSON
app.use(bodyParser.urlencoded({ extended: false }));

//-----------------------------------------------Routes--------------------------------------------

//Root
app.get("/", (req, res) => {
  res.send("Hello I am ETP Team1 backend!!!");
});

//Get balance of account
/*	ETP A1
	0x53db8233B2448fa6003d62a51318b71aab0aDc2e

	ETP A2
	0x9fFa2c0770952f605247BdAB10108aa67A291441
*/
app.get("/balance/:address", async (req, res) => {
  try {
    const balance = await web3.eth.getBalance(req.params.address);
    console.log(balance);

    const parseBalance = JSON.parse(
      JSON.stringify(balance, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
    console.log(parseBalance);

    res.send({ Balance: parseBalance });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

//Get last N blocks from blockchain
app.get("/lastBlocks/:n", async (req, res) => {
  try {
    //Retrieve last block number
    const latestBlockNumber = await web3.eth.getBlockNumber();
    console.log(`Last block number: ${latestBlockNumber} `);
    console.log(`Num blocks to retrieve: ${req.params.n} `);

    const blocks = [];
    for (let i = 0; i < req.params.n; i++) {
      const blockNumber = latestBlockNumber - BigInt(i);
      console.log(`Getting blockNumber: ${blockNumber}`);

      const block = await web3.eth.getBlock(blockNumber);
      console.log(`Retrieved blockNumber: ${blockNumber}`);

      //Convert BigInt -> unable to parse BigInt with JSON.stringify()
      const parseBlock = JSON.parse(
        JSON.stringify(block, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );

      blocks.push(parseBlock);
    }

    res.send(`Blocks: ${JSON.stringify(blocks, null, 2)}`);
  } catch (error) {
    res.status(500).send({ error });
  }
});

//Get details for specific block
app.get("/blockDetails/:blockNr", async (req, res) => {
  try {
    console.log(`Getting block number: ${req.params.blockNr}`);

    const block = await web3.eth.getBlock(req.params.blockNr);

    //Convert BigInt -> unable to parse BigInt with JSON.stringify()
    const parseBlock = JSON.parse(
      JSON.stringify(block, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    res.send({ parseBlock });
  } catch (error) {
    res.status(500).send({ error });
  }
});

//Faucet
app.post("/faucet", async (req, res) => {
  const { to, value } = req.body;
  const account = await web3.eth.accounts.decrypt(jsonWallet, PASSWORD);
  const tx = {
    chainId: 69,
    to,
    from: account.address,
    gas: 530000,
    gasPrice: "5000000000",
    value: web3.utils.toWei(value, "ether"),
  };
  const txSigned = await account.signTransaction(tx);
  const respuesta = await web3.eth.sendSignedTransaction(
    txSigned.rawTransaction
  );
  //para evitat el problema de bigInt
  respuesta.blockNumber = respuesta.blockNumber.toString();
  respuesta.cumulativeGasUsed = respuesta.cumulativeGasUsed.toString();
  respuesta.effectiveGasPrice = respuesta.effectiveGasPrice.toString();
  respuesta.gasUsed = respuesta.gasUsed.toString();
  respuesta.status = respuesta.status.toString();
  respuesta.transactionIndex = respuesta.transactionIndex.toString();
  respuesta.type = respuesta.type.toString();
  res.send(respuesta);
});

//Get Node list
app.get("/nodeList/", async (req, res) => {
  try {
    console.log(`Getting node list from network`);

    //---------------------------------------
    exec(
      'docker ps --filter "name=project-eth-cc-group-1*"',
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar el comando: ${error.message}`);
          return;
        }

        if (stderr) {
          console.error(`Error en la salida estándar: ${stderr}`);
          return;
        }

        // El resultado está en stdout

        console.log(`Resultado del comando:\n${stdout}`);

        // Construir la tabla HTML a partir de stdout
        const tablaHTML = construirTablaHTML(stdout);

        //res.send(`Node list:${stdout}`);
        // Enviar la tabla formateada como respuesta HTTP
        res.send(tablaHTML);
      }
    );
    //---------------------------------------
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

function construirTablaHTML(stdout) {
  // Supongamos que stdout contiene líneas con datos separados por espacios
  const lineas = stdout.trim().split("\n");

  // Construir la tabla HTML
  let tablaHTML = '<table class="table">';
  tablaHTML +=
    '<tr><th scope="col">Container ID</th><th scope="col">IMAGE</th><th scope="col">COMMAND</th><th scope="col">CREATED</th><th scope="col">STATUS</th><th scope="col">PORTS</th><th scope="col">NAME</th></tr>';

  lineas.shift();
  lineas.forEach((linea) => {
    const [containerId, image, command, created, status, ports, name] =
      linea.split(/\s{2,}/); // Ajusta según el formato de tus datos
    tablaHTML += `<tr><td>${containerId}</td><td>${image}</td><td>${command}</td><td>${created}</td><td>${status}</td><td>${ports}</td><td>${name}</td></tr>`;
  });

  tablaHTML += "</table>";

  return tablaHTML;
}

//--------------------------------------------Run server--------------------------------------------
app.listen(3333);

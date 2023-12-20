const {create_docker_compose, add_node_to_docker_compose} = require("./create_docker_compose");
const express = require("express")
const cors = require("cors");
const fs = require("fs")
const {exec, execSync} = require("child_process");
// const fichero = create_docker_compose(2,2,"private_network_5", 8545)

let network_name = "private_network_1"

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.put("/start_network", async (req,res) => {
    // console.log(req.body)
    const network_name = req.body.network_name
    const v_nodes = req.body.validator_nodes
    const n_nodes = req.body.normal_nodes
    const port = req.body.host_http_port
    const fichero = await create_docker_compose(v_nodes, n_nodes, network_name, port)
    fs.writeFileSync(`${__dirname}/docker-compose/compose.yaml`, fichero)
    exec(`docker compose -f ${__dirname}/docker-compose/compose.yaml up`)
    res.send(`Network ${network_name} created, ${JSON.stringify(req.body)}`)
})

app.delete("/stop_network/:network_name", async (req,res) => {
    // console.log(req.body)
    network_name = req.params.network_name
    execSync(`docker compose -f ${__dirname}/docker-compose/compose.yaml down`)
    exec(`rm -r ${__dirname}/docker-compose/${network_name}`)
    exec(`rm -r ${__dirname}/docker-compose/explorer/services/blockscout-db-data`)
    exec(`rm -r ${__dirname}/docker-compose/explorer/services/logs`)
    exec(`rm -r ${__dirname}/docker-compose/explorer/services/redis-data`)
    exec(`rm -r ${__dirname}/docker-compose/explorer/services/stats-db-data`)
    res.send("Network stopped")
})

app.delete("/stop_node/:node", async (req,res) => {
    // console.log(req.body)
    const node = req.params.node
    execSync(`docker stop ${node}`)
    res.send(`Node ${node} stopped`)
})

app.put("/add_node/:node", async (req,res) => {
  const node = req.params.node

  execSync(`mkdir -p ./docker-compose/${network_name}/${node}`)
  execSync(`cp ./docker-compose/files_network/bootnode ./docker-compose/${network_name}/${node}`)
  execSync(`cp ./docker-compose/files_network/genesis.json ./docker-compose/${network_name}/${node}`)
  

  filepath = `${__dirname}/docker-compose/compose.yaml`
  const new_compose = await add_node_to_docker_compose(filepath, node, network_name)

  // fs.writeFileSync(`./docker-compose/compose_prueba.yaml`, new_compose)
  fs.writeFileSync(`./docker-compose/compose.yaml`, new_compose)
  // exec(`docker compose -f ${__dirname}/docker-compose/compose_prueba.yaml up`)
  exec(`docker compose -f ./docker-compose/compose.yaml up`)

  res.send(`Node ${node} created!`)
})

app.get("/nodeList/", async (req, res) => {
    try {
      console.log(`Getting node list from network`);
  
      //---------------------------------------
      exec(
        'docker ps --filter "name=private_network*"',
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

app.get("/getLogs", (req,res) => {
    exec(`docker compose -f ${__dirname}/docker-compose/compose.yaml down`)
})

app.listen(3335)

// console.log(fichero)
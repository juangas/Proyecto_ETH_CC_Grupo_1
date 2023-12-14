const fs = require("fs")
const yaml = require("js-yaml")
// const express = require("express")

// const app = express()

// app.listen(3333)

//DOCKER
DOCKER_NETWORK_NAME = "chainnet"
DOCKER_NETWORK_IP = "172.25.0.0"
// BOOT NODE
const N_NODES = 8
const NAME_NETWORK = "private_network_1"
const BOOTNODE_PORT = 30305
// const BOOTNODE_IP = "172.25.0.100"

// VALIDATOR NODE
VALIDATOR_HTTP_PORT = 8545
// const VALIDATOR_IP = "172.25.0.100"
const filespath = `${__dirname}/files`

async function getYaml(filepath) {
    const data = fs.readFileSync(filepath, 'utf-8')
    const data_yaml = await yaml.load(data)
    return data_yaml
}

async function incrementIpByOne(ip){
    return `${ip.split(".").slice(0,3).join(".")}.${parseInt(ip.split(".")[3], 10) + 1}`
}

async function main() {
    // Crear fichero principal docker compose
    main_yaml = await getYaml(`${filespath}/services.yaml`)
    main_yaml.services = {}
    bootnode_yaml = await getYaml(`${filespath}/bootnode.yaml`)
    validator_yaml = await getYaml(`${filespath}/validator_node.yaml`)
    normal_yaml = await getYaml(`${filespath}/normal_node.yaml`)
    network_yaml = await getYaml(`${filespath}/network.yaml`)
    

    const folderName = `${__dirname}/${NAME_NETWORK}`
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }


    // fill bootnode fields
    const BOOTNODE_IP = await incrementIpByOne(DOCKER_NETWORK_IP)
    bootnode_yaml.bootnode.volumes[0] = `./${NAME_NETWORK}:/root/.ethereum`
    bootnode_yaml.bootnode.command[1] = `/scripts/crear_directorios.sh -n ${N_NODES} -p ${BOOTNODE_PORT} -i ${BOOTNODE_IP}`
    bootnode_yaml.bootnode.networks.chainnet.ipv4_address = `${BOOTNODE_IP}`
    // add bootnode to main yaml
    main_yaml.services[Object.keys(bootnode_yaml)[0]] = bootnode_yaml[Object.keys(bootnode_yaml)[0]]
    
    // fill validator_node fields
    const VALIDATOR_IP = await incrementIpByOne(BOOTNODE_IP)
    validator_yaml.validator.volumes[0] = `./${NAME_NETWORK}/node_1:/root/.ethereum`
    validator_yaml.validator.ports[0] = `${VALIDATOR_HTTP_PORT}:${VALIDATOR_HTTP_PORT}`
    validator_yaml.validator.command[1] = `/scripts/ejecutar_nodo_validador.sh -p ${VALIDATOR_HTTP_PORT}`
    validator_yaml.validator.networks.chainnet.ipv4_address = `${VALIDATOR_IP}`
    // add validator to main yaml
    main_yaml.services[Object.keys(validator_yaml)[0]] = validator_yaml[Object.keys(validator_yaml)[0]]

    // fill normal_node's fields
    let NORMAL_IP = VALIDATOR_IP
    for (let i = 2; i < N_NODES+2; i++) {
        let temp_yaml = JSON.parse(JSON.stringify(normal_yaml))
        temp_yaml[`node_${i}`] = temp_yaml["node_normal"]
        delete temp_yaml["node_normal"]
        NORMAL_IP = await incrementIpByOne(NORMAL_IP)
        temp_yaml[`node_${i}`].volumes[0] = `./${NAME_NETWORK}/node_${i}:/root/.ethereum`
        temp_yaml[`node_${i}`].networks.chainnet.ipv4_address = `${NORMAL_IP}`
        main_yaml.services[Object.keys(temp_yaml)[0]] = temp_yaml[Object.keys(temp_yaml)[0]]
    }

    const nuevoContenido = yaml.dump(main_yaml)
    console.log(nuevoContenido)
}

main().catch(error => {
    console.log(error)
})
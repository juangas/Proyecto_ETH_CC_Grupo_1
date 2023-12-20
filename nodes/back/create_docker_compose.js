const fs = require("fs")
const yaml = require("js-yaml")
// const express = require("express")

// const app = express()

// app.listen(3333)

//DOCKER
// BOOT NODE
// const v_nodes = 3
// const n_nodes = 3
// const name_network = "private_network_1"
// network_http_port = 8545
// const BOOTNODE_PORT = 30305

// const VALIDATOR_IP = "172.25.0.100"
const filespath = `${__dirname}/files`

async function getYaml(filepath) {
    const data = fs.readFileSync(filepath, 'utf-8')
    const data_yaml = await yaml.load(data)
    return data_yaml
}


async function create_docker_compose(v_nodes, n_nodes, name_network, network_http_port) {
    // Crear fichero principal docker compose
    main_yaml = await getYaml(`${filespath}/services.yaml`)
    main_yaml.name = name_network
    main_yaml.services = {}
    bootnode_yaml = await getYaml(`${filespath}/bootnode.yaml`)
    validator_yaml = await getYaml(`${filespath}/validator_node.yaml`)
    normal_yaml = await getYaml(`${filespath}/normal_node.yaml`)
    explorer_yaml = await getYaml(`${filespath}/explorer.yaml`)
    // network_yaml = await getYaml(`${filespath}/network.yaml`)
    

    // const folderName = `${__dirname}/${name_network}`
    // if (!fs.existsSync(folderName)) {
    //     fs.mkdirSync(folderName);
    // }


    // fill bootnode fields
    bootnode_yaml.bootnode.volumes[0] = `./${name_network}:/root/.ethereum`
    bootnode_yaml.bootnode.ports[0] = `${network_http_port}:${network_http_port}`
    bootnode_yaml.bootnode.command[1] = `/scripts/create_directories_nodes.sh -b 1 -v ${v_nodes} -n ${n_nodes} -p 30305 && /scripts/execute_bootnode.sh -h 8545`
    // add bootnode to main yaml
    main_yaml.services[Object.keys(bootnode_yaml)[0]] = bootnode_yaml[Object.keys(bootnode_yaml)[0]]
    
    // fill validator_node fields
    for (let i = 1; i <= v_nodes; i++){
        let temp_yaml = JSON.parse(JSON.stringify(validator_yaml))
        temp_yaml[`node_validator_${i}`] = temp_yaml["validator"]
        delete temp_yaml["validator"]
        temp_yaml[`node_validator_${i}`].volumes[0] = `./${name_network}/validator_node_${i}:/root/.ethereum`
        // add validator to main yaml
        main_yaml.services[Object.keys(temp_yaml)[0]] = temp_yaml[Object.keys(temp_yaml)[0]]
    }
    // fill normal_node's fields
    for (let i = 1; i <= n_nodes; i++) {
        let temp_yaml = JSON.parse(JSON.stringify(normal_yaml))
        temp_yaml[`node_normal_${i}`] = temp_yaml["normal_node"]
        delete temp_yaml["normal_node"]
        temp_yaml[`node_normal_${i}`].volumes[0] = `./${name_network}/normal_node_${i}:/root/.ethereum`
        main_yaml.services[Object.keys(temp_yaml)[0]] = temp_yaml[Object.keys(temp_yaml)[0]]
    }

    // Agregate explorer containers

    Object.keys(explorer_yaml.services).map( clave => {
        main_yaml.services[clave] = explorer_yaml.services[clave]
    })
    const final_yaml = yaml.dump(main_yaml)
    console.log(final_yaml)
    return(final_yaml)
}
async function add_node_to_docker_compose(filepath, node_name, name_network) {
    // Crear fichero principal docker compose
    // main_yaml = await getYaml(`${__dirname}/docker-compose/compose.yaml`)
    main_yaml = await getYaml(`${filepath}`)
    normal_yaml = await getYaml(`${filespath}/normal_node.yaml`)
    let temp_yaml = JSON.parse(JSON.stringify(normal_yaml))
    temp_yaml[`${node_name}`] = temp_yaml["normal_node"]
    delete temp_yaml["normal_node"]
    temp_yaml[`${node_name}`].volumes[0] = `./${name_network}/${node_name}:/root/.ethereum`
    main_yaml.services[Object.keys(temp_yaml)[0]] = temp_yaml[Object.keys(temp_yaml)[0]]

    const final_yaml = yaml.dump(main_yaml)

    return(final_yaml)
}

module.exports = {
    create_docker_compose,
    add_node_to_docker_compose
};
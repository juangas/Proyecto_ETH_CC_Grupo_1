# Creation of a PoA (Proof of Authority) private ethereum network 

### 1. Clone the repo and create the directory of the node

Create the directory in which all the data related to the node will be created/saved.

```bash
git clone -b dev https://github.com/juangas/Proyecto_ETH_CC_Grupo_1.git
cd Proyecto_ETH_CC_Grupo_1/nodes/docker-compose
```

### 2. Excute the docker-compose:

```bash
docker-compose -f compose.yaml up
```

In aproximately 20 seconds you will have a network with a total of 4 nodes:

- bootnode: This node is in charge of the networking to the rest of the nodes. 1 node.
- validator_node: It is a node in charge of mine new blocks. 1 node.
- normal_nodes: Nodes that saves a copy of the blockchain. 2 nodes.

You can see the configuration of each node in the `private_network` directory.

You can connect to anyone of the nodes except the bootnode (There is not exposed http port on this node).

- node_1 (validator node) port 8578.
- node_2 (normal node) port 8579.
- node_3 (normal node) port 8580.

![](./images/nodos.png)

Once filanizing all the steps you will be able to make txs in your private PoA ethereum network.
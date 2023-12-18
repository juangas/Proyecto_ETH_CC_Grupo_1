## Prerrequisites

Have your Ethereum PoA running and at least a node accesible to the explorer.

### Installation of the explorer

1. Mode to folder /explorer/blockscout/docker-compose/ and build cocker containers

```bash
cd /explorer/blockscout/docker-compose/
docker-compose up --build
```

2. Make backend customizations to point private network Node. Change the parameters `ETHEREUM_JSONRPC_HTTP_URL` and `ETHEREUM_JSONRPC_TRACE_URL` in the file `Proyecto_ETH_CC_Grupo_1/explorer/blockscout/docker-compose/envs/common-blockscout.env` with the host and port of your node.


3. Deploy the blockexplorer with the command:

```bash
docker compose -f geth-clique-consensus.yml up
```

4. If you have deployed in your host machine the explorer should be accessible at http://localhost
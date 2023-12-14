## Prerrequisites

Have your Ethereum PoA running and at least a node accesible to the explorer.

### Installation of the explorer

1. Change the parameters `ETHEREUM_JSONRPC_HTTP_URL` and `ETHEREUM_JSONRPC_TRACE_URL` in the file `Proyecto_ETH_CC_Grupo_1/explorer/blockscout/docker-compose/envs/common-blockscout.env` with the host and port of your node.


2. Deploy the blockexplorer with the command:

```bash
docker compose -f /home/juangas/codecrypto/rama_dev/Proyecto_ETH_CC_Grupo_1/explorer/blockscout/docker-compose/geth-clique-consensus.yml up
```

3. If you have deployed in your host machine the explorer should be accessible at http://localhost
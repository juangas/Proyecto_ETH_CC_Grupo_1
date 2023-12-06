#!/bin/sh

# Inicializa la variable con un valor predeterminado

while getopts ":p:" opt; do
  case $opt in
    p)
      PORT="$OPTARG"
      ;;
    \?)
      echo "Opción no válida: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "La opción -$OPTARG requiere un argumento." >&2
      exit 1
      ;;
  esac
done

# Verifica si se proporcionó el flag --port o -p con un valor
if [ -z "$PORT" ]; then
  echo "Se requiere el flag --port o -p con un valor."
  exit 1
fi

sleep 10

apk update
apk add jq

WALLET_ADDRESS=$(jq -r '.address' /root/.ethereum/keystore/$(ls /root/.ethereum/keystore))
WALLET_ADDRESS=$(echo "0x$WALLET_ADDRESS")


geth init /root/.ethereum/genesis.json

echo "Hello from here"
BOOTNODE=$(cat /root/.ethereum/bootnode | head -n 1)

geth --http --http.addr 0.0.0.0 --http.port $PORT --http.api web3,eth,net,debug,personal,txpool --http.corsdomain '*' --datadir=/root/.ethereum --unlock $(echo "$WALLET_ADDRESS") --password /root/.ethereum/password.txt --mine --miner.etherbase $(echo "$WALLET_ADDRESS") --allow-insecure-unlock --nat extip:172.25.0.101 --ipcdisable --bootnodes $BOOTNODE

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

apk update
apk add jq

sleep 10

geth init /root/.ethereum/genesis.json

BOOTNODE=$(cat /root/.ethereum/bootnode | head -n 1)

geth --http --http.addr 0.0.0.0 --http.port $PORT --http.api web3,eth,net,debug,personal,txpool --http.corsdomain '*' --datadir=/root/.ethereum --ipcdisable --bootnodes $BOOTNODE

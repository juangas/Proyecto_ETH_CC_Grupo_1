#!/bin/sh

# Inicializa la variable con un valor predeterminado
while getopts ":n:i:h:" opt; do
  case $opt in
    i)
      BOOT_IP="$OPTARG"
      ;;
    h)
      HTTP_PORT="$OPTARG"
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

if [ -z "$BOOT_IP" ]; then
  echo "Se requiere el flag --ip o -i con un valor."
  exit 1
fi

if [ -z "$HTTP_PORT" ]; then
  echo "Se requiere el flag --ip o -i con un valor."
  exit 1
fi


BOOTNODE=$(cat /scripts/bootnode | head -n 1)

geth init --datadir /root/.ethereum/bootnode /root/.ethereum/bootnode/genesis.json

geth --http --http.addr 0.0.0.0 --port 30303 --http.port $HTTP_PORT --http.api debug,net,eth,shh,web3,txpool --ipcdisable --http.corsdomain '*' --datadir=/root/.ethereum/bootnode --nat extip:$BOOT_IP --bootnodes $BOOTNODE --ws.api "eth,net,web3,network,debug,txpool" --ws --ws.addr 0.0.0.0 --ws.port 8546 --ws.origins "*" --syncmode "full" --gcmode "archive" --http.vhosts "*"
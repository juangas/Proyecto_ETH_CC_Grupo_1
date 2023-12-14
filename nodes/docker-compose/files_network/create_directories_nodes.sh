#!/bin/sh

# Inicializa la variable con un valor predeterminado
while getopts ":b:v:n:p:i:" opt; do
  case $opt in
    b)
      N_BOOTNODES="$OPTARG"
      ;;
    v)
      N_VALIDATOR_NODES="$OPTARG"
      ;;
    n)
      N_NORMAL_NODES="$OPTARG"
      ;;
    p)
      BOOT_PORT="$OPTARG"
      ;;
    i)
      BOOT_IP="$OPTARG"
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
if [ -z "$N_BOOTNODES" ]; then
  echo "Se requiere el flag --bootnodes o -b con un valor."
  exit 1
fi

if [ -z "$N_VALIDATOR_NODES" ]; then
  echo "Se requiere el flag --validator_nodes o -v con un valor."
  exit 1
fi

if [ -z "$N_NORMAL_NODES" ]; then
  echo "Se requiere el flag --normal_nodes o -n con un valor."
  exit 1
fi

if [ -z "$BOOT_PORT" ]; then
  echo "Se requiere el flag --port o -p con un valor."
  exit 1
fi

if [ -z "$BOOT_IP" ]; then
  echo "Se requiere el flag --ip o -i con un valor."
  exit 1
fi

apk update
apk add jq

# mkdir -p /root/.ethereum/node_1
bootnode -genkey /root/boot.key &
sleep 1
bootnode -nodekey /root/boot.key -addr $BOOT_IP:$BOOT_PORT | head -n 1 > /scripts/bootnode &
sleep 1

# Create the genesis json with the wallets of the validators
extradata="0x0000000000000000000000000000000000000000000000000000000000000000"
for i in `seq 1 $N_VALIDATOR_NODES`
do
  mkdir -p /root/.ethereum/validator_node_$i
  if [ -z "$(find "/root/.ethereum/validator_node_$i/keystore" -mindepth 1 -print -quit)" ]; then
    geth account new --datadir /root/.ethereum/validator_node_$i --password /scripts/password.txt
  fi
  extradata="$extradata"$(jq -r .address /root/.ethereum/validator_node_$i/keystore/$(ls /root/.ethereum/validator_node_$i/keystore))
done
extradata="$extradata"0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
jq --arg ed "$extradata" '.extradata = $ed' "/scripts/genesis.json" > temp.json && mv temp.json "/scripts/genesis.json"

# Create directory of the bootnode
mkdir -p /root/.ethereum/bootnode
cp /scripts/genesis.json /root/.ethereum/bootnode

# Create directories of the validator nodes
i=1 
for i in `seq 1 $N_VALIDATOR_NODES`
do
  cp /scripts/password.txt /root/.ethereum/validator_node_$i
  cp /scripts/genesis.json /root/.ethereum/validator_node_$i
  cp /scripts/bootnode /root/.ethereum/validator_node_$i
done

i=1
for i in `seq 1 $N_NORMAL_NODES`
do
  mkdir -p /root/.ethereum/normal_node_$i
  cp /scripts/genesis.json /root/.ethereum/normal_node_$i
  cp /scripts/bootnode /root/.ethereum/normal_node_$i
done

# BOOTNODE=$(cat /scripts/bootnode | head -n 1)

# geth init --datadir /root/.ethereum/bootnode /root/.ethereum/bootnode/genesis.json

# geth --http --http.addr 0.0.0.0 --port 30303 --http.port 8545 --http.api debug,net,eth,shh,web3,txpool --http.corsdomain '*' --datadir=/root/.ethereum/bootnode --nat extip:$BOOT_IP --bootnodes $BOOTNODE --ws.api "eth,net,web3,network,debug,txpool" --ws --ws.addr 0.0.0.0 --ws.port 8546 --ws.origins "*" --syncmode "full" --gcmode "archive" --http.vhosts "*"

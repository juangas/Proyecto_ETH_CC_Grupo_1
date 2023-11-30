#!/bin/sh

# Inicializa la variable con un valor predeterminado
while getopts ":n:p:i:" opt; do
  case $opt in
    i)
      BOOT_IP="$OPTARG"
      ;;
    n)
      N_NODES="$OPTARG"
      ;;
    p)
      BOOT_PORT="$OPTARG"
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
if [ -z "$N_NODES" ]; then
  echo "Se requiere el flag --n_nodes o -n con un valor."
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

# Create directory of the bootnode
mkdir -p /root/.ethereum/bootnode
cp /scripts/genesis.json /root/.ethereum/bootnode

mkdir -p /root/.ethereum/node_1
bootnode -genkey /root/.ethereum/node_1/boot.key &
sleep 1
bootnode -nodekey /root/.ethereum/node_1/boot.key -addr $BOOT_IP:$BOOT_PORT | head -n 1 > /scripts/bootnode &
sleep 1
cp -r /scripts/keystore /root/.ethereum/node_1
cp /scripts/password.txt /root/.ethereum/node_1
i=1
for i in `seq 1 $N_NODES`
do
  mkdir -p /root/.ethereum/node_$i
  cp /scripts/genesis.json /root/.ethereum/node_$i
  cp /scripts/bootnode /root/.ethereum/node_$i
done

BOOTNODE=$(cat /scripts/bootnode | head -n 1)

geth init --datadir /root/.ethereum/bootnode /root/.ethereum/bootnode/genesis.json

geth --datadir=/root/.ethereum/bootnode --nat extip:$BOOT_IP --bootnodes $BOOTNODE

## Deploy backend nodes

1. Install the dependencies

```
cd Proyecto_ETH_CC_Grupo_1/nodes/back
npm install
```

2. Desplegar el back de los nodos, tiene que tener acceso al docker por lo que si no necesita privilegios ejecutaremos:

```
node network_management_back.js
```

y sino:

```
sudo node network_management_back.js
```

3. Desplegar el front-end web.

4. Desplegar el back-end web.

Una vez está todo desplegado, ir a la página web y hacer click en START NETWORK.

Cuando hayamos finalizado podemos eliminar la red al completo haciendo click en el botón STOP NETWORK.

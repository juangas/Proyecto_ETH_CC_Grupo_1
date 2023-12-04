# Proyecto_ETH_CC_Grupo_1
# Backend

1 → Comprobar

Comprueba que exista el fichero de la walllet de la linea  9 del fichero /back/app.js


2 → Lanzar 

Comprueba que no tienes ocupado el puerto especificado en la línea 3 del fichero /back/app.js

```cmd
npx nodemon app.js
```

3 → Test
```cmd
curl localhost:3333/balance/0xf4Fc5c0b43a94893AF879703edA5C3757E2b4266
curl localhost:3333/faucet/0xf4Fc5c0b43a94893AF879703edA5C3757E2b4266/1
```

Substituye el parametro por la wallet que desees.
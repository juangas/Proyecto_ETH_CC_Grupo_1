# Proyecto_ETH_CC_Grupo_1

# Backend

## Crear un fichero .env

En se tiene que crear un fichero .env en la raiz del proyecto back, crear las siguientes variables

- KEYSTORE. Es el nombre del keystore que se ha generado cuando se creo el nodo
- PWASSOWRD. Es la contraseña utilizada par acceder a la info del keystore.

# Backend

1 → Comprobar

Comprueba que exista el fichero de la walllet de la linea 9 del fichero /back/app.js

2 → Lanzar

Comprueba que no tienes ocupado el puerto especificado en la línea 3 del fichero /back/app.js

```cmd
cd back
npx nodemon app.js
```

3 → Test

```cmd
curl localhost:3333/balance/0xf4Fc5c0b43a94893AF879703edA5C3757E2b4266
curl localhost:3333/faucet/0xf4Fc5c0b43a94893AF879703edA5C3757E2b4266/1
```

Substituye el parametro por la wallet que desees.

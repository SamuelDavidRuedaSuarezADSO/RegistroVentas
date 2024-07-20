# RegistroVentas

El desarrollo del proyecto se encuentra en la rama "desarrollo"

## Ejecutar correctamente el repositorio

Clonar el repositorio

```
git clone https://github.com/SamuelDavidRuedaSuarezADSO/RegistroVentas.git
```

crear y posicionar en la rama inicio

```
git checkout -b inicio
```

hacer el pull de la rama inicio

```
git pull origin inicio
```

crear y posicionarse en la rama desarrollo

```
git checkout -b desarrollo
```

hacer el pull de la rama desarrollo

```
git pull origin desarrollo
```

y abrir el visual Studio Code

```
code .
```

## Para que las validaciones funcionen necesitas tener instaldo json-server
#### Para descargar json-server necesitas tener una version de node.js superior o igual a la 20.

para instarlo de manera GLOBAL (si no deseas instalarlo de manera global sono quita -g del codigo).

```
npm install -g json-server
```

Despues nos ubicamos en la carpeta llamada "server" y ejecutamos el json server
```
npx json-server bd.json
```

###### Cuando se termine de usar la base de datos Presiona CONTROL + C para cerrrar el json-server
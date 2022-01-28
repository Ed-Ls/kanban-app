# CORS

CORS signifie cross origin ressource sharing soit en français le partage de ressoruce entres les origines / entres les domaines

Par défaut dans nos navigateur un script sur toto.com sera bloqué s'il essaye de faire des requete http vers hello.fr 

A moins que hello.fr ne spécifie une politique de CORS

Dans notre cas c'est l'api okanban qui sera consommé par le front qu'on va faire en s7 donc c'est l'api qui va décider si elle autorise le front à la consommer ou pas

Pour ça l'api doit renvoyer des entetes pour autoriser ou non les autres origin par exemle

```
Access-Control-Allow-Origin: http://toto.example
```

On pourrait faire un middleware coté express pour l'ajouter, mais on peut utiliser un package qui le fait très bien
En effet ça peut etre pratique d'utiliser ce package car certaines requetes nécessitent davantage de Header pour autorisé des méthdoes ou des entetes particulière, cf https://developer.mozilla.org/fr/docs/Web/HTTP/CORS
La configuration est plus simple avec ce package

https://www.npmjs.com/package/cors

Quelques exemples

```js
// j'autorise toutes les origines
app.use(cors({
    origin: '*',
}));

// ou bien 
app.use(cors({
    origin: 'http://toto.com', // je n'autorise qu'une origine spécifique
}));
```
require('dotenv').config();

const path = require('path');
const express = require('express');
const router = require('./app/router');

const port = process.env.PORT || 3000;

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', './app/views');

// Pour ouvrir un POST
app.use(express.urlencoded({extended: true}));

// app.use(express.static(path.join(__dirname, './assets')))

// // il nous faut charger le middleware pour gérer les sessions
// const session = require('express-session');

// app.use(session({
//    saveUninitialized: true,
//    resave: true,
//    secret: 'Un super secret' // que on pourrait mettre dans une variable d'env
// }));

// // pour que le user soit toujours accessible dans mes vues
// app.use(sessionMiddleware);

app.use(router);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});
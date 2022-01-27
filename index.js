require('dotenv').config();

// const path = require('path');
const express = require('express');
const router = require('./app/router');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(router);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});
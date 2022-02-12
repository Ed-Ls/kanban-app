'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./app/router');
const multer = require('multer');
const bodyParser = multer();

const port = process.env.PORT || 5000;

const app = express();

// Specifying CORS politics
app.use(cors({
   origin: '*', 
}));

app.use( bodyParser.none() );
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(router);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});
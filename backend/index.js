const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('./db.js');
const routes = require('./routes/routes.js');

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }

const app = express()
            .use(bodyParser.json())
            .use(cors(corsOptions));


app.listen(3000 , () => console.log('Server started at port 3000'));

app.use('/employee' , routes);
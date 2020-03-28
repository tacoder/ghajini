'use strict';

const express = require('express');
const ccreminder = require('./ccreminder.js');
const cron = require("node-cron");
const mongoose = require("./mongo.js");
const fileUpload = require('express-fileupload');
const uploadRoutes = require('./upload_routes.js');
const app = express();
// var bodyParser = require('body-parser');
// default options
app.use(fileUpload());
app.get('/', function(req, res){
  res.render('form');
});
app.set('view engine', 'pug');
app.set('views', './views');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
// app.use(bodyParser.urlencoded({ extended: true })); 
// App
// const app = express();
app.get('/ping', (req, res) => {
  res.send('Hello World Reloaded!');
});

app.get('/mongo', (req,res) => {
    console.log("Testing mongoose");
    mongoose.test();
})

app.get('/remind', (req,res) => {
    console.log("Remingdin");
    ccreminder.remind();
})
app.post('/uploadBill', uploadRoutes.uploadBill);

cron.schedule("* * * * *", function(){console.log("run")});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

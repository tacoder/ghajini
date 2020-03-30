'use strict';

const express = require('express');
const ccreminder = require('./ccreminder.js');
const cron = require("node-cron");
const mongoose = require("./mongo.js");
const fileUpload = require('express-fileupload');
const uploadRoutes = require('./upload_routes.js');
const app = express();
const config = require("./config.js");

app.use(fileUpload());

app.set('view engine', 'pug');
app.set('views', './views');

const PORT = 8080;
const HOST = '0.0.0.0';

app.get('/ping', (req, res) => {
  res.send('healthy!');
});

app.get('/remind', (req,res) => {
    console.log("Remingdin");
    ccreminder.remind();
    res.send('Reminding!');
});

app.get('/uploadBill', function(req, res){
  var requestedBillType = req.query.billType;
  res.render('form', {config:config, requestedBillType : requestedBillType});
});
app.post('/uploadBill', uploadRoutes.uploadBill);

cron.schedule("0 0 7 * * *", function(){console.log("running cron");     ccreminder.remind();
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);

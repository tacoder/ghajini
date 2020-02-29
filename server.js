'use strict';

const express = require('express');
const ccreminder = require('./ccreminder.js');
const cron = require("node-cron");
const mongoose = require("./mongo.js");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
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

cron.schedule(" * * * * *", ccreminder.run);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

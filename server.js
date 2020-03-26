'use strict';

const express = require('express');
const ccreminder = require('./ccreminder.js');
const cron = require("node-cron");
const mongoose = require("./mongo.js");
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/var/uploaded-bills/bill-typefilename.jpg', function(err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
  }
    res.send('File uploaded!');
  });
});

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

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

cron.schedule("* * * * *", function(){console.log("run")});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

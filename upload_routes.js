
const mongoose = require("./mongo.js");
const uploadNotifier = require("./upload_notifier.js");
const config = require("./config.js");
const mkdirp = require('mkdirp')

function validBillType(billType) {
    for (bill in config.bills) {
        if (config.bills[bill].name === billType) {
            return true;
        }
    }
    return false;
}

function getBillConfig(billType) {
    for (bill in config.bills) {
        if (config.bills[bill].name === billType) {
            return config.bills[bill];
        }
    }
    return false;
}

async function alreadyUploaded(billType) {
    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999);

    try {
        const data = await mongoose.searchForUploadedBillTypeBetweenDates(billType, start, end);
        return data.length > 0;
    } catch (err) {
        console.error(err);
        throw err; // Rethrow the error to be handled by the caller
    }
}

function getProofDirectory(billType) {
    folderName = '/var/uploaded-bills/';
    var now = new Date();
    var date = now.getFullYear() + "-"+ now.getMonth() + "-" + now.getDate();
    return folderName+billType+'/'+date;
}

function mergeConfig(config, commonConfig) {
    for (key in commonConfig) {
      if(! (key in config)) {
        config[key] = commonConfig[key];
      }
    }
    return config;
}

function getConfig(billType) {
    return mergeConfig(getBillConfig(billType), config.common);
}

async function uploadBillFn(req, res) {
    // Validations remain the same...

    var billType = req.body.billType;

    let proof = req.files.proof;
    var proofDirectory = getProofDirectory(billType);

    if (!validBillType(billType)) {
        return res.status(400).send('Unsupported bill type.');
    }

    try {
        const isUploaded = await alreadyUploaded(billType);
        if (isUploaded) {
            return res.status(400).send('Already uploaded for this bill type today. Try again tomorrow!');
        } else {
            mkdirp.sync(proofDirectory);
            proof.mv(proofDirectory + '/' + proof.name, async function(err) {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                } else {
                    try {
                        const data = await mongoose.recordPayment({name: billType}, new Date(), proofDirectory + '/' + proof.name);
                        console.log("Received data after record payment in mongoose- ", data);
                        uploadNotifier.notify(getConfig(billType), data);
                        res.send('File uploaded!');
                    } catch (err) {
                        console.log("ERROR!-", err);
                        return res.status(500).send(err);
                    }
                }
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
}

module.exports ={uploadBill:uploadBillFn}

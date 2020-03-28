
const mongoose = require("./mongo.js");
const config = require("./config.js");

function validBillType(billType) {
    for (bill in config.bills) {
        if (bill.name === billType) {
            return true;
        }
    }
    return false;
}

function alreadyUploaded(billType, cb ){
    var start = new Date();
    start.setHours(0,0,0,0);
    
    var end = new Date();
    end.setHours(23,59,59,999);    
    
    mongoose.searchForUploadedBillTypeBetweenDates(billType, start, end, function(err, data){
        if(err) {
            cb(err, true);
        }
        if(data.length > 0 ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    });
}

function getProofLocation(billType) {
    folderName = '/var/uploaded-bills/';
    var now = new Date();
    var date = now.getFullYear() + "-"+ now.getMonth() + "-" + now.getDate();
    return folderName+date+'/'+billType+'/'; 
}

function uploadBillFn(req, res) {
  var billType = req.params.billType;
  var proofLocation = getProofLocation(billType); //'/var/uploaded-bills/bill-type/filename.jpg';

  // Validations:
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let proof = req.files.proof;

  if (!validBillType(billType)) {
    return res.status(400).send('Unsupported bill type.');
  }
  if(alreadyUploaded(billType), function(err, isUploaded) {
      if(err ) {
        return res.status(500).send(err);  
      } else {
          if(isUploaded) {
            return res.status(400).send('Already uploaded for this bill type today. Try again tomorrow!');
          } else {
            mkdirp(proofLocation, function(err) { 
                if(err) {
                    console.log(err);
                        return res.status(500).send(err);
                } else {
                    proof.mv(proofLocation, function(err) {
                        if (err) {
                            console.log(err);
                            return res.status(500).send(err);
                        } else {
                            mongoose.recordPayment({name:billType}, new Date(), proofLocation, function(err, data) {
                                if(err) {
                                    console.log("ERROR!-", err);
                                    return res.status(500).send(err);
                                } else {
                                    console.log("Received data after record paytment in mongoose- ", data);
                                    res.send('File uploaded!');
                                }
                            });
                        }
                    });
                }       
            });
     
          }
      }
  });  
}

module.exports ={uploadBill:uploadBillFn}
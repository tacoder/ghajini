const mongoose = require("./mongo.js");

function wasBillPaidBetweenDatesFn(bill, from, to, cb) {
    mongoose.searchForUploadedBillTypeBetweenDates(bill.name, from, to, function(err, data){
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

  module.exports = {wasBillPaidBetweenDates:wasBillPaidBetweenDatesFn}
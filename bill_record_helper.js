const mongoose = require("./mongo.js");

function wasBillPaidBetweenDatesFn(bill, from, to, cb) {
    mongoose.searchForUploadedBillTypeBetweenDates(bill.name, from, to, function(err, data){
        if(err) {
            cb(err, false, null);
        }
        if(data.length > 0 ) {
            cb(null, true, data);
        } else {
            cb(null, false, null);
        }
    });
  }

  module.exports = {wasBillPaidBetweenDates:wasBillPaidBetweenDatesFn}
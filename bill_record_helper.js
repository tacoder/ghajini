const mongoose = require("./mongo.js");

function wasBillPaidBetweenDatesFn(bill, from, to) {
  console.log("Checking for bill , ", bill.name);
  return new Promise((resolve, reject) => {
      mongoose.searchForUploadedBillTypeBetweenDates(bill.name, from, to)
          .then(data => {
              console.log("data from mongo is", data);
              if(data.length > 0) {
                  resolve({ wasPaid: true, paidBillDetails: data });
              } else {
                  resolve({ wasPaid: false, paidBillDetails: null });
              }
          })
          .catch(err => {
              reject(err);
          });
  });
}


// function wasBillPaidBetweenDatesFn(bill, from, to, cb) {
//     mongoose.searchForUploadedBillTypeBetweenDates(bill.name, from, to, function(err, data){
//         if(err) {
//             cb(err, false, null);
//         }
//         if(data.length > 0 ) {
//             cb(null, true, data);
//         } else {
//             cb(null, false, null);
//         }
        
//     });
//     // return { err: false, waspaid: false, paidBillDetails: null}
//   }

  module.exports = {wasBillPaidBetweenDates:wasBillPaidBetweenDatesFn}
const mongoose = require('mongoose');

const mongoUrl = process.env.GHAJINI_MONGO_URL || 'mongodb://localhost:27017/test'
mongoose.connect(mongoUrl , {useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 1000});

const BillPaymentReocrd = mongoose.model('BillPaymentRecord', {'bill_name': String, 'bill_payment_date': Date, 'proofLocation':String})

function recordPaymentFn(billConfig, paymentDoneDate, proofLocationIn) {
    console.log("Recording Payment for ", billConfig.name, " on ", paymentDoneDate, " with proof at ", proofLocationIn);
    const newRecord = new BillPaymentReocrd({
        bill_name: billConfig.name,
        bill_payment_date: paymentDoneDate,
        proofLocation: proofLocationIn
    });
    // Return the promise directly
    return newRecord.save();
}

function searchForUploadedBillTypeBetweenDatesFn(billType, start, end) {
    console.log("Searching for ", billType, " between ", start, " and ", end);
    // Return the promise directly
    return BillPaymentReocrd.find({
        'bill_name': billType,
        'bill_payment_date': {
            "$gte": start,
            "$lt": end
        }
    }).exec(); // Adding .exec() to explicitly return a Promise
}


// function recordPaymentFn(billConfig, paymentDoneDate, proofLocationIn, cb) {
//     const newRecord = new BillPaymentReocrd({bill_name:billConfig.name,bill_payment_date:paymentDoneDate,proofLocation:proofLocationIn});
//     newRecord.save().then( () => {
//         console.log('saved As New Record!');
//         cb(null, newRecord);
//     }).catch( (err) => {
//         console.log("something went wrong", err)
//         cb(err);
//     })
// }

// function searchForUploadedBillTypeBetweenDatesFn(billType, start, end, cb) {
//     BillPaymentReocrd.find({ 
//         'bill_name': billType, 
//         'bill_payment_date': { 
//             "$gte": start, 
//             "$lt": end } 
//         }, (err, data) => {cb(err,data)});
// }

module.exports = {recordPayment:recordPaymentFn, searchForUploadedBillTypeBetweenDates:searchForUploadedBillTypeBetweenDatesFn}

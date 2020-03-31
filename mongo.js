const mongoose = require('mongoose');

mongoose.connect('mongodb://database:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const BillPaymentReocrd = mongoose.model('BillPaymentRecord', {'bill_name': String, 'bill_payment_date': Date, 'proofLocation':String})

function recordPaymentFn(billConfig, paymentDoneDate, proofLocationIn, cb) {
    const newRecord = new BillPaymentReocrd({bill_name:billConfig.name,bill_payment_date:paymentDoneDate,proofLocation:proofLocationIn});
    newRecord.save().then( () => {console.log('saved As New Record!');cb()}).catch((err)=>console.log("something went wrong", err))
}

function searchForUploadedBillTypeBetweenDatesFn(billType, start, end, cb) {
    BillPaymentReocrd.find({ 
        'bill_name': billType, 
        'bill_payment_date': { 
            "$gte": start, 
            "$lt": end } 
        }, (err, data) => {cb(err,data)});
}

module.exports = {recordPayment:recordPaymentFn, searchForUploadedBillTypeBetweenDates:searchForUploadedBillTypeBetweenDatesFn}

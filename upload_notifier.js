var notifications_helper = require('./notications_helper.js');

function notifyFn(billConfig, uploadedBillDetails) {
    notifications_helper.notifyUploadBill(billConfig, uploadedBillDetails);
}

module.exports = {notify:notifyFn}
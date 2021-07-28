var notifications_helper = require('./notications_helper.js');

function notifyFn(billConfig, daysLeft, uploadedBillDetails) {
    notifications_helper.notifyUploadBill(billConfig, daysLeft, uploadedBillDetails);
}

module.exports = {notify:notifyFn}
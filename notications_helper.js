var email_helper = require('./email_service.js');
var config = require('./config.js');

function getPaymentUrlForBill(bill) {
    return `https://abhinavsingh.co.in/ghajini/uploadProof?billType=${bill.name}`;
}

function getHtmlForEmail(text, billConfig) {
    var paymentUrl = getPaymentUrlForBill(billConfig);
    return `<p>${text}</p><p><strong>Please ignore if already paid</strong></p><br /><p>Click <a href='${paymentUrl}'>here</a> to upload proof after payment</p>`;
}

function notifyPendingFn(billConfig, daysLeft) {
    var subject = "[PENDING] Payment for " + billConfig.name;
    var paymentUrl = getPaymentUrlForBill(billConfig);
    var text = `Bill payment is pending for ${billConfig.name} ${daysLeft} days left to pay`;
    var html = getHtmlForEmail(text, billConfig);
    console.log(text);
    email_helper.sendMail(subject, text, html, billConfig.email);
}

function notifyUpcomingFn(billConfig, daysLeft) {
    var subject = "[ALERT] Upcoming due date for " + billConfig.name;
    var text = `Bill payment is upcoming for ${billConfig.name} ${daysLeft} days left to pay.`;
    var paymentUrl = getPaymentUrlForBill(billConfig);
    var html = getHtmlForEmail(text, billConfig);
    console.log(text);
    email_helper.sendMail(subject, text, html, billConfig.email);
}

function notifyGoneFn(billConfig, daysGone) {
    var subject = "[ALERT] Past due date for " + billConfig.name;
    var text = `Bill payment is past due date for ${billConfig.name} ${daysGone} days passed.`;
    var paymentUrl = getPaymentUrlForBill(billConfig);
    var html = getHtmlForEmail(text, billConfig);
    console.log(text);
    email_helper.sendMail(subject, text, html, billConfig.email);
}
module.exports = {notifyPending:notifyPendingFn,notifyUpcoming:notifyUpcomingFn,notifyGone:notifyGoneFn}

if (require.main === module) {
  notifyUpcomingFn(config.bills[0], 100);
  notifyGoneFn(config.bills[0], 100);
}
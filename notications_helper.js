const email_helper = require('./email_service.js');
const config = require('./config.js');
const mime = require('mime-types')
const path = require('path');
const fs = require('fs');
const summary_email_generator = require('./email/summary_email_generator.js');
const { getPaymentUrlForBill } = require('./util.js');

function getHtmlForEmail(text, billConfig) {
    var paymentUrl = getPaymentUrlForBill(billConfig);
    return `<p>${text}</p><p><strong>Please ignore if already paid</strong></p><br /><p>Click <a href='${paymentUrl}'>here</a> to upload proof after payment</p><br /> <br />` + (billConfig.emailBody || '');
}

function getUploadedFilePath(data) {
    return data.proofLocation;
}


function base64StringFromFile(file){
    var bitmap = fs.readFileSync(file);
    return Buffer.from(bitmap).toString('base64');
}

function getAttachmentForPath(filePath) {
    var filename = path.basename(filePath);
    var attachmentType = mime.contentType(filePath);
    var content = base64StringFromFile(filePath);
    return {
        content: content,
        filename: filename,
        type: attachmentType,
        disposition: 'attachment'
    }
}

function getAttachments(filePaths) {
    console.log("getting attachments - ", filePaths);
    var toReturn = [];
    for(var index in filePaths) {
        var filePath = getUploadedFilePath(filePaths[index]);
        console.log("getting attachment for file path - ", filePath);
        if((!(filePath)) || filePath === "") {
            // Do nothing
        } else {
            try {
            toReturn.push(getAttachmentForPath(filePath));
            } catch (e) {
                console.error("Exception caught while trying to get attachment from file path - " , filePath, e);
            }
        }
    }
    return toReturn;
}

function notifyPendingFn(billConfig, daysLeft) {
    var subject = "[PENDING] Payment for " + billConfig.name;
    var text = `Bill payment is pending for ${billConfig.name} ${daysLeft} days left to pay`;
    var html = getHtmlForEmail(text, billConfig);
    console.log(text);
    email_helper.sendMail(subject, text, html, billConfig.email);
}

function notifyUploadBillFn(billConfig, uploadedBillDetails) {
    var subject = "[INFO] Bill paid for " + billConfig.name;
    var text = `This is a notification that you have just uploaded a bill proof of type - ${billConfig.name}. File uploaded is attached for your reference.`;
    var html = getHtmlForEmail(text, billConfig);
    var attachments  = getAttachments([uploadedBillDetails]);
    console.log(text);
    email_helper.sendMail(subject, text, html, billConfig.email, attachments);
}

function notifyPaidBillFn(billConfig, daysLeft, uploadedBillDetails) {
    var subject = "[INFO] Upcoming due date for " + billConfig.name;
    console.log(uploadedBillDetails);
    var text = `You have already paid this bill. This email is just a notification for your reference.<br /> <br />  Proof location as per record is - ${getUploadedFilePath(uploadedBillDetails)} In case the proof is wrong or you wish to upload proof again, use the link below.<br /> <br /> Due date is upcoming for ${billConfig.name} ${daysLeft} days left to pay.`;
    var html = getHtmlForEmail(text, billConfig);
    var attachments = getAttachments((uploadedBillDetails));
    console.log(text);
    email_helper.sendMail(subject, text, html, billConfig.email, attachments);
}

function alertUnpaidBillFn(billConfig, daysLeft) {
    var subject = "[URGENT] Upcoming due date for " + billConfig.name;
    var text = `UNPAID BILL!!! Pay bill and upload proof to stop receiving these emails.<br /> Due date is upcoming for ${billConfig.name}. <br />`
    if(daysLeft >= 0) {
        text += `${daysLeft} days left to pay!!!`;
    } else {
        text += `${-daysLeft} days have already passed!!!`;
    }

    var html = getHtmlForEmail(text, billConfig);
    console.log(text);
    email_helper.sendMail(subject, text, html, billConfig.email);
}

function notifyFatalErrorFn(err, adminEmail) {
    var subject = "[!!FATAL!!] Fatal error occurred in ghajini app";
    var text = '<p>Fatal error received in application!<br /><br />' + `${err}` + '<br /> <br />' + `${err.stack}` + '</p>' ;
    var html = `<p>${text}</p>`
    console.log(text);
    email_helper.sendMail(subject, text, html, adminEmail);
}

function notifySummaryFn(summary) {
    var subject = "Summary for your pending deatilu";
    var text = new summary_email_generator().generateSummaryHtml(summary);
    var html = `<p>${text}</p>`
    // console.log(text);
        // new summary_email_generator().generateSummaryHtml(summary);
    email_helper.sendMail(subject, text, html, "abhinav.singh21093@gmail.com");
}

module.exports = {
    notifyPending:notifyPendingFn,
    notifyUploadBill:notifyUploadBillFn,
    notifyPaidBill:notifyPaidBillFn,
    alertUnpaidBill:alertUnpaidBillFn,
    notifyFatalError:notifyFatalErrorFn,
    notifySummary:notifySummaryFn
}

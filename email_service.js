// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendMailFn(subject, text, html, recepient, attachments=[]) {
    const msg = {
        to: recepient,
        from: 'tacobot77@gmail.com',
        subject: subject,
        text: text,
        html: html,
        attachments: attachments
    };
    console.log("sending test email", JSON.stringify(msg, null, 2));
    //sgMail.send(msg);
}

module.exports = {sendMail:sendMailFn}


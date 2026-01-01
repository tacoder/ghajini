// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
//const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const brevo = require("@getbrevo/brevo");
const TransactionalEmailsApi = brevo.TransactionalEmailsApi;
const SendSmtpEmail = brevo.SendSmtpEmail;

function sendMailFn(subject, text, html, recepient, attachments=[]) {

    let emailAPI = new TransactionalEmailsApi();
    emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_KEY

    let message = new SendSmtpEmail();
    message.subject = subject;
    message.textContent = text;
    message.htmlContent = html;
    message.attachment = attachments;
    message.sender = { name: "Taco bot", email: "tacobot77@gmail.com" };
    message.to = [{ email: "abhinav.singh21093@gmail.com", name: "Abhinav singh" }];

    emailAPI.sendTransacEmail(message).then(res => {
        console.log(JSON.stringify(res.body));
    }).catch(err => {
        console.error("Error sending email:", err.body);
    });
}




//#import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
// Configure API key authorization: api-key
module.exports = {sendMail:sendMailFn}

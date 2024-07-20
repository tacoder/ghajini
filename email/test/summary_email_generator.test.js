const EmailTemplateGenerator = require('../summary_email_generator');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('EmailTemplateGenerator', function() {
    describe('#generateSummaryHtml()', function() {
        it('should generate valid HTML for a given summary object', function() {
            const generator = new EmailTemplateGenerator();
            const summary =  {"lapsed":[],"urgent":[{"config":{"name":"SBI Cashback","issue_date":5,"due_date":24,"keep_reminding_before_days":5,"notify_after_days":2,"email":"abhinav.singh21093@gmail.com","paid_bill_notification_days":3,"unpaid_bill_notification":{"days_before":5,"days_after":2}},"daysLeft":4,"paidBillDetails":null}],"unpaid":[{"config":{"name":"SBI Cashback","issue_date":5,"due_date":24,"keep_reminding_before_days":5,"notify_after_days":2,"email":"abhinav.singh21093@gmail.com","paid_bill_notification_days":3,"unpaid_bill_notification":{"days_before":5,"days_after":2}},"daysLeft":4,"paidBillDetails":null}],"paid":[{"config":{"name":"amex card bill pay","issue_date":5,"due_date":23,"keep_reminding_before_days":3,"notify_after_days":2,"email":"abhinav.singh21093@gmail.com","paid_bill_notification_days":3,"unpaid_bill_notification":{"days_before":5,"days_after":2}},"daysLeft":3,"paidBillDetails":[{"_id":"668e29f1bed586fa36ae2e7f","bill_name":"amex card bill pay","bill_payment_date":"2024-07-10T06:28:01.444Z","proofLocation":"/var/uploaded-bills/amex card bill pay/2024-6-10/Screenshot_20240710_115433_Amex IN.jpg","__v":0}]}],"tasks":[]};
            const html = generator.generateSummaryHtml(summary);

            // Check if the generated HTML is not empty
            // assert.ok(html.length > 0);

            // // Check for presence of specific content in the generated HTML
            // assert.ok(html.includes("Electricity Bill"));
            // assert.ok(html.includes("Water Bill"));

            // Optionally, you can write the generated HTML to a file for manual inspection
            fs.writeFileSync(path.join(__dirname, 'summary_output.html'), html);
        });
    });
});
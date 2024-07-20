const pug = require('pug');
const fs = require('fs');
const path = require('path');
const getPaymentUrlForBill = require('../notications_helper.js').getPaymentUrlForBill;

class EmailTemplateGenerator {
    // constructor(templatePath) {
    //     this.templatePath = templatePath;
    // }

    generateSummaryHtml(summary) {
        // Define the path to the template relative to this script
        const templatePath = path.join(__dirname, 'template', 'summary_email.pug');

        // Compile the template to a function using the absolute path
        const compileTemplate = pug.compileFile(templatePath);
        
        // Compile the template to a function
        // const compileTemplate = pug.compileFile('email/templates/summary_email.pug');

        // Process each category in the summary object
        const categories = Object.keys(summary);
        const processedData = categories.reduce((acc, category) => {
            console.log(" summary[category]", summary[category]);
            acc[category] = summary[category]
                .filter(item => item !== null) // Filter out null values
                .map(item => {
                    // console.log("item", item);
                    // const daysLeft = this.calculateDaysLeft(item.due_date);
                    const paymentLink = getPaymentUrlForBill(item.config); // Assuming a method to generate payment links
                    return { ...item, paymentLink };
                })
                .sort((a, b) => a.daysLeft - b.daysLeft); // Sort by days left
            return acc;
        }, {});
        
        // Generate HTML with the processed data
        const html = compileTemplate({categories:processedData});
        return html;
    }
}

module.exports = EmailTemplateGenerator;

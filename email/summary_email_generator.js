const pug = require('pug');
const fs = require('fs');
const path = require('path');
const juice = require('juice');
const { getPaymentUrlForBill } = require('../util.js');
class EmailTemplateGenerator {
    generateSummaryHtml(summary) {
        function toTitleCase(str) {
            return str.replace(
                /\w\S*/g,
                function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }
        function getFileName(filePath) {
            return path.basename(filePath);
        }
        // Define the path to the template relative to this script
        const templatePath = path.join(__dirname, 'template', 'summary_email.pug');

        // Compile the template to a function using the absolute path
        const compileTemplate = pug.compileFile(templatePath);
        
        // Process each category in the summary object
        const categories = Object.keys(summary);
        const processedData = categories.reduce((acc, category) => {
            console.log(" summary[", category, "]", summary[category]);
            acc[category] = summary[category]
                .filter(item => item !== null) // Filter out null values
                .map(item => {
                    const paymentLink = getPaymentUrlForBill(item.config); // Assuming a method to generate payment links
                    return { ...item, paymentLink };
                })
                .sort((a, b) => a.daysLeft - b.daysLeft); // Sort by days left
            return acc;
        }, {});
        
        // Generate HTML with the processed data
        const html = compileTemplate({categories:processedData, toTitleCase:toTitleCase, getFileName:getFileName});
        // 2. Inline the CSS (This fixes the Brevo/Gmail issue)
        const inlinedHtml = juice(html) ;
        return inlinedHtml;
    }
}

module.exports = EmailTemplateGenerator;
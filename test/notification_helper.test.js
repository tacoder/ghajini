// Import the module and mock dependencies
const notificationsHelper = require('../notications_helper.js');
jest.mock('../email_service.js');

const email_helper = require('../email_service.js');

describe('notificationsHelper', () => {
  describe('notifySummaryFn', () => {
    it('should call sendMail with the correct subject', () => {
      // Arrange
      const summary =  {"lasped":[],"urgent":[{"config":{"name":"amex card bill pay","issue_date":5,"due_date":23,"keep_reminding_before_days":3,"notify_after_days":2,"email":"abhinav.singh21093@gmail.com","paid_bill_notification_days":3,"unpaid_bill_notification":{"days_before":5,"days_after":2}},"daysLeft":3,"paidBillDetails":null},{"config":{"name":"SBI Cashback","issue_date":5,"due_date":24,"keep_reminding_before_days":5,"notify_after_days":2,"email":"abhinav.singh21093@gmail.com","paid_bill_notification_days":3,"unpaid_bill_notification":{"days_before":5,"days_after":2}},"daysLeft":4,"paidBillDetails":null}],"unpaid":[{"config":{"name":"RLM elec bill 5977261502","issue_date":15,"due_date":29,"keep_reminding_before_days":3,"notify_after_days":2,"email":"abhinav.singh21093@gmail.com","emailBody":"https://www.bescom.co.in/SCP/MyAccount/QuickPayment.aspx","paid_bill_notification_days":3,"unpaid_bill_notification":{"days_before":5,"days_after":2}},"daysLeft":9,"paidBillDetails":null},{"config":{"name":"AXIS flipkart card","issue_date":15,"due_date":5,"keep_reminding_before_days":3,"notify_after_days":2,"email":"abhinav.singh21093@gmail.com","paid_bill_notification_days":3,"unpaid_bill_notification":{"days_before":5,"days_after":2}},"daysLeft":16,"paidBillDetails":null},{"config":{"name":"RBL zomato edition","issue_date":16,"due_date":6,"keep_reminding_before_days":3,"notify_after_days":2,"email":"abhinav.singh21093@gmail.com","paid_bill_notification_days":3,"unpaid_bill_notification":{"days_before":5,"days_after":2}},"daysLeft":17,"paidBillDetails":null},{"config":{"name":"sbi BPCL bill pay","issue_date":8,"due_date":28,"keep_reminding_before_days":3,"notify_after_days":2,"email":"abhinav.singh21093@gmail.com","paid_bill_notification_days":3,"unpaid_bill_notification":{"days_before":5,"days_after":2}},"daysLeft":8,"paidBillDetails":null},{"config":{"name":"HDFC diners bill pay","issue_date":15,"due_date":5,"keep_reminding_before_days":3,"notify_after_days":2,"email":"abhinav.singh21093@gmail.com","paid_bill_notification_days":3,"unpaid_bill_notification":{"days_before":5,"days_after":2}},"daysLeft":16,"paidBillDetails":null},{"config":{"name":"amex card bill pay","issue_date":5,"due_date":23,"keep_reminding_before_days":3,"notify_after_days":2,"email":"abhinav.singh21093@gmail.com","paid_bill_notification_days":3,"unpaid_bill_notification":{"days_before":5,"days_after":2}},"daysLeft":3,"paidBillDetails":null},{"config":{"name":"mtnl bill pay","issue_date":8,"due_date":29,"keep_reminding_before_days":3,"notify_after_days":2,"email":"abhinav.singh21093@gmail.com","paid_bill_notification_days":3,"unpaid_bill_notification":{"days_before":5,"days_after":2}},"daysLeft":9,"paidBillDetails":null},{"config":{"name":"SBI Cashback","issue_date":5,"due_date":24,"keep_reminding_before_days":5,"notify_after_days":2,"email":"abhinav.singh21093@gmail.com","paid_bill_notification_days":3,"unpaid_bill_notification":{"days_before":5,"days_after":2}},"daysLeft":4,"paidBillDetails":null}],"paid":[],"tasks":[]};
      const expectedSubject = 'Bill summary|Urgent 2|Unpaid 8';
      
      // Act
      notificationsHelper.notifySummary(summary);

      // Assert
      expect(email_helper.sendMail).toHaveBeenCalled();
      const actualSubject = email_helper.sendMail.mock.calls[0][0];
      console.log("actula sub - ", actualSubject);
      expect(actualSubject===expectedSubject).toBeTruthy();
    });
  });
});
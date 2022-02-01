/**
 * paid_bill_notification_days :
 *  This value determines the days X before due date, on which an `inform` notification will be sent to user to inform of a upcoming due date for a PAID bill
 *
 * unpaid_bill_notification:
 *  This value determines from and to which day (relative to due date) an URGENT notifications will be sent daily for an upcoming UNPAID bill
 *
 */
var config =  {
    common : {
      keep_reminding_before_days: 3,
      notify_after_days: 2,
      paid_bill_notification_days: 3,
      unpaid_bill_notification: {
        days_before: 5,
        days_after: 2
      }
    },
    bills : [
        {
          name: "BSES bill pay",
          issue_date: 25,
          due_date: 9,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com"
        },
        {
          name: "citibank bill pay",
          issue_date: 20,
          due_date: 6,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com"
        },
        {
          name: "sbi BPCL bill pay",
          issue_date: 8,
          due_date: 28,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com"
        },
        {
          name: "HDFC diners bill pay",
          issue_date: 15,
          due_date: 5,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com"
        },
        {
          name: "amex card bill pay",
          issue_date: 5,
          due_date: 23,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com"
        },
        {
          name: "mtnl bill pay",
          issue_date: 8,
          due_date: 29,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com"
        },
        {
          name: "airtel internet bill pay",
          issue_date: 27,
          due_date: 16,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com"
        }
      ]
  }
  module.exports = config

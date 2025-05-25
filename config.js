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
          name: "Hdfc swiggy",
          issue_date: 15,
          due_date: 4,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com"
        },
        {
          name: "RLM elec bill 5977261502",
          issue_date: 11,
          due_date: 25,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com",
          emailBody: "https://www.bescom.co.in/bescom/main/quick-payment-details/5977261502"
        },
        {
          name: "AXIS flipkart card",
          issue_date: 15,
          due_date: 5,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com"
        },
        {
          name: "RBL zomato edition",
          issue_date: 16,
          due_date: 5,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com"
        },
        {
          name: "BSES bill pay 103371500",
          issue_date: 25,
          due_date: 9,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com",
          emailBody: "https://www.bsesdelhi.com/web/brpl/quick-pay-payment?p_p_id=com_bses_pay_now_portlet_BsesPayNowWebPortlet&p_p_lifecycle=0&_com_bses_pay_now_portlet_BsesPayNowWebPortlet_caNo=103371500"
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
          name: "HDFC millenia bill pay",
          issue_date: 16,
          due_date: 4,
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
          email: "abhinav.singh21093@gmail.com",
          emailBody: "https://billalert.mtnl.net.in/pay/login.asp"
        },
        {
          name: "airtel internet bill pay",
          issue_date: 27,
          due_date: 7,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com"
        },
        {
          name: "Phone backup",
          issue_date: 1,
          due_date: 15,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com",
          emailBody: "<ol><li>Photos</li><li>Contacts</li><li>Videos</li><li>Recordings</li><li><ol>",
          task: true
        },
        {
          name: "Print statements",
          issue_date: 1,
          due_date: 15,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com",
          emailBody: "<ol><li>ICICI plat</li><li>RBL shotrite</li><li>HDFC mmillenia</li><li>AMEX</li><li>ICICI AMZ</li><li>AXIS Flipkart</li><li>SBI BPCL</li></ol>",
          task: true
        },
        {
          name: "Analyse spends",
          issue_date: 1,
          due_date: 15,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com",
          task: true
        },
        {
          name: "Cash monthly",
          issue_date: 25,
          due_date: 30,
          keep_reminding_before_days: 1,
          notify_after_days: 5,
          email: "abhinav.singh21093@gmail.com",
          task: true
        },
        {
          name: "Country delight wallet load",
          issue_date: 1,
          due_date: 15,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com"
        },
        {
          name: "DigitalOcean payment",
          issue_date: 1,
          due_date: 10,
          keep_reminding_before_days: 3,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com"
        },
        {
          name: "SBI Cashback",
          issue_date: 5,
          due_date: 24,
          keep_reminding_before_days: 5,
          notify_after_days: 2,
          email: "abhinav.singh21093@gmail.com"
        }
      ]
  }
  module.exports = config

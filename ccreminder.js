var config = require('./config.js');
var notifications_helper = require('./notications_helper.js');
var ccreminder_date_helper = require('./ccreminder_date_helper.js');
var date_helper = require("./date_helper.js");
var recordsHelper = require('./bill_record_helper.js')

var getCurrentMonthDate = date_helper.getCurrentMonthDate;
var dateBetween = date_helper.dateBetween;
var getDueDate = ccreminder_date_helper.getDueDate;
var getIssuedDate = ccreminder_date_helper.getIssuedDate;

var notifyPending = notifications_helper.notifyPending;

var wasBillPaidBetweenDates = recordsHelper.wasBillPaidBetweenDates;

function isDueDateNear(unpaid_bill_notification, daysLeft) {
  if ( daysLeft >= 0  && unpaid_bill_notification.days_before >= daysLeft) {
    return true;
  } else if(daysLeft < 0 && unpaid_bill_notification.days_after >= (-daysLeft)) {
    return true;
  }

  return false;
}

function minusOneMonth(date) {
  var d = new Date(date);
  d.setMonth(d.getMonth() - 1);
  return d;
}

function remindForBillAndDate(bill, todaysDate) {
    var dueDate = getDueDate(bill, todaysDate);
    var issuedDate = getIssuedDate(bill, todaysDate);
    var today = getCurrentMonthDate(todaysDate);

    // console.log("getDueDate", dueDate)
    // console.log("getIssuedDate", issuedDate)
    // console.log("getKeepRemindingBeforeDate", keepRemindingBeforeDate)
    // console.log("getNotifyAfterDate", notifyAfterDate)

    // Is pending?
    wasBillPaidBetweenDates(bill, issuedDate, dueDate, function (err, wasPaid, paidBillDetails){
      console.log("today: ", today);
      if(err) {
        console.log("Received error while checking if bill was paid or not. Assuming it was not paid and sending further notifications. This message should also be notified to user so a notification is also sent to admin.");
        notifications_helper.notifyFatalError(err);
        wasPaid = false;
      }
      var daysLeft = Math.round((dueDate - today)/(1000*60*60*24));
      if (dateBetween(today, issuedDate, dueDate)) {
        if (!wasPaid) {
          notifyPending(bill, daysLeft);
        }
      }
      if(wasPaid) {
        // If today is notification day for paid bills
        if(bill.paid_bill_notification_days == daysLeft) {
          // notify upcoming due date
          notifications_helper.notifyPaidBill(bill, daysLeft, paidBillDetails)
        }
      } else {
        if(isDueDateNear(bill.unpaid_bill_notification, daysLeft)) {
          // notify URGENT near due date
          if(dueDateUpcoming()){
            notifications_helper.alertUnpaidBill(bill, daysLeft);
          } else {
            wasBillPaidBetweenDates(bill, minusOneMonth(issuedDate), minusOneMonth(dueDate), function (err, wasPaid, paidBillDetails){
              if(wasPaid) {
                notifications_helper.alertUnpaidBill(bill, daysLeft);
              }
            });
          }
        }
      }
    });

}


function mergeConfig(config, commonConfig) {
  for (key in commonConfig) {
    if(! (key in config)) {
      config[key] = commonConfig[key];
    }
  }
  return config;
}

function remindFn() {
  var todaysDate = new Date().getDate();
  for (bill in config.bills) {
    var billConfig = config.bills[bill];
    var billConfigWithCommons = mergeConfig(billConfig, config.common);
    console.log("CONFIG ID ");
    console.log(JSON.stringify(billConfigWithCommons));
    remindForBillAndDate(billConfigWithCommons, todaysDate);
  }
}

module.exports = {  remind : remindFn }

if (require.main === module) {
  // for (bill in config.bills) {
    console.log("==============================");
    console.log("==============================");
    console.log("==============================");
    var mergedConfig = mergeConfig(config.bills[0], config.common);
    console.log(JSON.stringify(mergedConfig));

    for (var i = 1 ; i <= 30 ; i ++) {
      console.log("DAY #",i)
      remindForBillAndDate(mergedConfig, i);
    }
  // }
}
var config = require('./config.js');
var notifications_helper = require('./notications_helper.js');
var ccreminder_date_helper = require('./ccreminder_date_helper.js');
var date_helper = require("./date_helper.js");
var recordsHelper = require('./bill_record_helper.js')
var mergeObjectsWithArrayValues = require('./util.js').mergeObjectsWithArrayValues;
var getCurrentMonthDate = date_helper.getCurrentMonthDate;
var dateBetween = date_helper.dateBetween;
var getDueDate = ccreminder_date_helper.getDueDate;
var getIssuedDate = ccreminder_date_helper.getIssuedDate;

var wasBillPaidBetweenDates = recordsHelper.wasBillPaidBetweenDates;

function dueDateUpcoming(unpaid_bill_notification, daysLeft) {
  if ( daysLeft >= 0  && unpaid_bill_notification.days_before >= daysLeft) {
    return true;
  } else {
    return false;
  }
}

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

function datum(bill, daysLeft, paidBillDetails) {
  return {
    config: bill,
    daysLeft:daysLeft,
    paidBillDetails: paidBillDetails 
  }
}

async function remindForBillAndDate(bill, todaysDate) {
    var dueDate = getDueDate(bill, todaysDate);
    var issuedDate = getIssuedDate(bill, todaysDate);
    var today = getCurrentMonthDate(todaysDate);
    var alerts = {
      lapsed: [],
      urgent: [],
      unpaid: [],
      paid: [],
      tasks: []
    } 

    // Is pending?
    var billpaiddetails = await wasBillPaidBetweenDates(bill, issuedDate, dueDate);
    var err= billpaiddetails.err;
    var wasPaid = billpaiddetails.wasPaid;
    var paidBillDetails = billpaiddetails.paidBillDetails;

      console.log("==================================");
      console.log("==================================");
      console.log("==================================");
      console.log("today: ", today);
      console.log("Checking for bill , ", bill.name);
      console.log("was paid - ", wasPaid, " paid bill details - ", paidBillDetails);
      console.log(" ----  ");
    console.log("getDueDate", dueDate)
    console.log("getIssuedDate", issuedDate)
      if(err) {
        console.log("Received error while checking if bill was paid or not. Assuming it was not paid and sending further notifications. This message should also be notified to user so a notification is also sent to admin.");
        notifications_helper.notifyFatalError(err);
        wasPaid = false;
      }
      var daysLeft = Math.round((dueDate - today)/(1000*60*60*24));
      console.log("Days left for payment are - ", daysLeft)
      if (dateBetween(today, issuedDate, dueDate)) {
          console.log("Toady is between issue date and due date.");
        if (!wasPaid) {
            console.log("Bill has not been paid, notifying bill payment for this bill type.");
            // notifications_helper.notifyPending(bill, daysLeft);
            if(bill.task) {
              alerts.tasks.push(datum(bill, daysLeft, paidBillDetails))
            } else {
              alerts.unpaid.push(datum(bill, daysLeft, paidBillDetails))
            }
        }
      }
      if(wasPaid) {
          console.log("Bill was already paid, with details - ", paidBillDetails);
        // If today is notification day for paid bills
        if(bill.paid_bill_notification_days == daysLeft) {
            console.log("Time for notification , Bill was paid, paid bill details - ", JSON.stringify(paidBillDetails, null, 2));
          // notify upcoming due date
          // notifications_helper.notifyPaidBill(bill, daysLeft, paidBillDetails)
          alerts.paid.push(datum(bill, daysLeft, paidBillDetails))
        }
      } else {
          console.log("Bill was not paid, checking if due date is near...");

        if(isDueDateNear(bill.unpaid_bill_notification, daysLeft)) {
          // notify URGENT near due date
          console.log("Bill due date is near, days left = ", daysLeft, " bill unpaid config details = ", bill.unpaid_bill_notification);
          if(dueDateUpcoming(bill.unpaid_bill_notification, daysLeft)){
              console.log("Due date is upcoming... alerting unpaid bill notif ");
            // notifications_helper.alertUnpaidBill(bill, daysLeft);
            alerts.urgent.push(datum(bill, daysLeft, paidBillDetails))
          } else {
              console.log("Due date has gone by, checking if last cycle bill details were uploaded.");
              var lastStart = minusOneMonth(issuedDate);
              var lastEnd = (dueDate);
              console.log("Searching for this bill between dates ", lastStart, "and ", lastEnd);
              var wasBillPaid = await wasBillPaidBetweenDates(bill,lastStart, lastEnd);
              var err = wasBillPaid.err;
              var wasPaid = wasBillPaid.wasPaid;
              var paidBillDetails = wasBillPaid.paidBillDetails;
              console.log(">>>>>>>>>>>>>>>>>>>>");
              console.log(">>>>>>>>>>>>>>>>>>>>");
              console.log(">>>>>>>>>>>>>>>>>>>>");
              console.log("I checked for", bill.name, ", between dates ", lastStart, "and ", lastEnd, "I found following details - ");
              if(!wasPaid) {
                console.log("Due date gone, For bill config - ", bill, ". And bill was not paid. Sending alert notification.");
                // notifications_helper.alertUnpaidBill(bill, daysLeft);
                alerts.lapsed.push(datum(bill, daysLeft, paidBillDetails))
              } else {
                  console.log("Due date gone, For bill config - ", bill.name, ". And bill was paid.");
                  console.log("paid bill details - ", paidBillDetails);
              }
            ;
          }
        } else {
            console.log("Due date is not near!");
        }
      }
    return alerts;
}


function mergeConfig(config, commonConfig) {
  for (key in commonConfig) {
    if(! (key in config)) {
      config[key] = commonConfig[key];
    }
  }
  return config;
}



async function remindFn() {
  var todaysDate = new Date().getDate();
  var alerts = {};
  for (bill in config.bills) {
    var billConfig = config.bills[bill];
    var billConfigWithCommons = mergeConfig(billConfig, config.common);
    console.log("CONFIG ID ");
    console.log(JSON.stringify(billConfigWithCommons));
    var alertsForThisBill = await remindForBillAndDate(billConfigWithCommons, todaysDate);
    // console.log("akerts for this bill - ", alertsForThisBill);
    alerts = mergeObjectsWithArrayValues(alerts, alertsForThisBill);
  }
  // console.log("finla set of alret e", alerts);
  notifications_helper.notifySummary(alerts);
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

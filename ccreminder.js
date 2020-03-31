var config = require('./config.js');
var notifications_helper = require('./notications_helper.js');
var ccreminder_date_helper = require('./ccreminder_date_helper.js');
var date_helper = require("./date_helper.js");
var recordsHelper = require('./bill_record_helper.js')

var getCurrentMonthDate = date_helper.getCurrentMonthDate;
var dateBetween = date_helper.dateBetween;
var getDueDate = ccreminder_date_helper.getDueDate;
var getIssuedDate = ccreminder_date_helper.getIssuedDate;
var getKeepRemindingBeforeDate = ccreminder_date_helper.getKeepRemindingBeforeDate;
var getNotifyAfterDate = ccreminder_date_helper.getNotifyAfterDate;

var notifyPending = notifications_helper.notifyPending;
var notifyUpcoming = notifications_helper.notifyUpcoming;
var notifyGone = notifications_helper.notifyGone;

var wasBillPaidBetweenDates = recordsHelper.wasBillPaidBetweenDates;

function remindForBillAndDate(bill, todaysDate) {
    var dueDate = getDueDate(bill, todaysDate);
    var issuedDate = getIssuedDate(bill, todaysDate);
    var keepRemindingBeforeDate = getKeepRemindingBeforeDate(bill, todaysDate);
    var notifyAfterDate = getNotifyAfterDate(bill, todaysDate);
    var today = getCurrentMonthDate(todaysDate);

    // console.log("getDueDate", dueDate)
    // console.log("getIssuedDate", issuedDate)
    // console.log("getKeepRemindingBeforeDate", keepRemindingBeforeDate)
    // console.log("getNotifyAfterDate", notifyAfterDate)
    // console.log("today: ", today);

    // Is pending?
    if (dateBetween(today, issuedDate, dueDate)) {
      wasBillPaidBetweenDates(bill, issuedDate, dueDate, function (err, wasPaid){
        if(!wasPaid){
          return notifyPending(bill, Math.round((dueDate - today)/(1000*60*60*24) ));
        }
        return;
      });
    } 

    // Is near?
    if(dateBetween(today, keepRemindingBeforeDate, dueDate)) {
     notifyUpcoming(bill, Math.round((dueDate - today)/(1000*60*60*24) ));
    }
    
    // Is recently gone?
    if(dateBetween(today, dueDate, notifyAfterDate)) {
     notifyGone(bill,  Math.round((today - dueDate)/(1000*60*60*24)) );
    }
}

function remindFn() {
  var todaysDate = new Date().getDate();
  for (bill in config.bills) {
    remindForBillAndDate(config.bills[bill], todaysDate);
  }
}

module.exports = {  remind : remindFn }

if (require.main === module) {
  // for (bill in config.bills) {
    console.log("==============================");
    console.log("==============================");
    console.log("==============================");

    for (var i = 1 ; i <= 31 ; i ++) {
      console.log("DAY #",i)
        remindForBillAndDate(config.bills[0], i);
    }
  // }
}
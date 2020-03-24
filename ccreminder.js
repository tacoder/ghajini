var config = require('./config.js');
function runFunc() {
    console.log("Running");
}

function wasBillPaidBetweenDates(bill, from, to) {
  return true;
}

function notifyPending(billConfig, daysLeft) {
  console.log("Bill payment is pending for ", billConfig.name, " ", daysLeft, " days left to pay");
}

function notifyUpcoming(billConfig, daysLeft) {
  console.log("Bill payment is upcoming for ", billConfig.name, " ", daysLeft, " days left to pay");
}

function notifyGone(billConfig, daysGone) {
  console.log("Bill payment is gone :( for ", billConfig.name, " ", daysGone, " days ago");
}

function remindFn() {
    var todaysDate = new Date().getDay();
    for (bill in config.bills) {
      remindForBillAndDate(config.bills[bill], todaysDate);
    }
}

function dateBetween(dateToCheck, from, to) {
  return from <= dateToCheck && dateToCheck < to;
}

function getDueDate(bill, todaysDate) {
  if (bill.issue_date <= bill.due_date) {
    return getCurrentMonthDate(bill.due_date);
  } else {
    if(todaysDate < bill.issue_date){
      return getCurrentMonthDate(bill.due_date)
    } else {
      return getNextMonthDate(bill.due_date);
    }
  }
}

function getIssuedDate(bill, todaysDate) {
  if (bill.issue_date <= bill.due_date) {
    return getCurrentMonthDate(bill.issue_date);
  } else {
    if(todaysDate < bill.due_date){
      return getPreviousMonthDate(bill.issue_date);
    } else {
      return getCurrentMonthDate(bill.issue_date);
    }
  }
}

function getPreviousMonthDate(todaysDate) {
  var d =  getCurrentMonthDate(todaysDate);
  d.setMonth(d.getMonth() - 1 );
  return d;
}

function getNextMonthDate(todaysDate) {
  var d =  getCurrentMonthDate(todaysDate);
  d.setMonth(d.getMonth() + 1 );
  return d;
}

function getKeepRemindingBeforeDate(bill, todaysDate) {
  var due_date = getDueDate(bill, todaysDate);
  var krbDate = new Date(due_date);
  krbDate.setDate(krbDate.getDate() - bill.keep_reminding_before_days);
  return krbDate
}

function getCurrentMonthDate(todaysDate) {
  var d = new Date();
  d.setDate(todaysDate);
  return d;
}


function getNotifyAfterDate(bill, todaysDate) {
  var due_date = getDueDate(bill, todaysDate);
  var naDate = new Date(due_date);
  naDate.setDate(naDate.getDate() + bill.notify_after_days);
  return naDate
}

function getDateAt (todaysDate ) {
  var d = new Date();
  d.setDate(todaysDate);
  return d;
}
function remindForBillAndDate(bill, todaysDate) {
    var dueDate = getDueDate(bill, todaysDate);
    var issuedDate = getIssuedDate(bill, todaysDate);
    var keepRemindingBeforeDate = getKeepRemindingBeforeDate(bill, todaysDate);
    var notifyAfterDate = getNotifyAfterDate(bill, todaysDate);
    var today = getDateAt(todaysDate);

    // console.log("getDueDate", dueDate)
    // console.log("getIssuedDate", issuedDate)
    // console.log("getKeepRemindingBeforeDate", keepRemindingBeforeDate)
    // console.log("getNotifyAfterDate", notifyAfterDate)
    // console.log("today: ", today);

    // Is pending?
    if (dateBetween(today, issuedDate, dueDate) && !wasBillPaidBetweenDates(bill, issuedDate, dueDate)){
      notifyPending(bill, Math.round((dueDate - today)/(1000*60*60*24) ));
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

module.exports = { run : runFunc , remind : remindFn }

if (require.main === module) {
  for (bill in config.bills) {
    console.log("==============================");
    console.log("==============================");
    console.log("==============================");

    for (var i = 1 ; i <= 31 ; i ++) {
      console.log("DAY #",i)
        remindForBillAndDate(config.bills[bill], i);
    }
  }
}
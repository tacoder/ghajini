//var config = require('./config.js');
// /*
var config =  {
  bills : [
      {
        name: "citibank bill pay",
        issue_date: 20,
        due_date: 6
      },
      {
        name: "sbi card bill pay",
        issue_date: 8,
        due_date: 28
      },
      {
        name: "amex card bill pay",
        issue_date: 5,
        due_date: 23
      },
      {
        name: "mtnl bill pay",
        issue_date: 8,
        due_date: 29
      },
      {
        name: "Mother bill pay.",
        issue_date: 28,
        due_date: 12
      },
      {
        name: "airtel internet bill pay",
        issue_date: 27,
        due_date: 16
      }
    ]
}
// */
function runFunc() {
    console.log("Running");
}

function remindFn() {
    for (bill in config.bills) {
      remindForBill(config.bills[bill]);
    }
}

function remindForBill(bill) {
    console.log("reminding for bill : ", bill["name"], bill);
    for (var todaysDate = 1 ; todaysDate < 32 ; todaysDate ++){
        console.log("For day : " , todaysDate);
        console.log(" isCurrentMonthBill " + isCurrentMonthBill(bill, todaysDate));
        if (isBillPending(bill, todaysDate)){
            console.log("Your bill is pending payment!");
        } else {
            console.log("RElax! no bill  not pending tofdat:!");
        }
    }
}

function isCurrentMonthBill(bill, todaysDate) {
    return isBillPending(bill, todaysDate)
    && (bill.issue_date <= bill.due_date)
         || (bill.issue_date > bill.due_date && todaysDate >= bill.issue_date);
}

function isBillPending(bill, todaysDate) {
    return (bill.issue_date <= bill.due_date && dateIsInRange(todaysDate, bill.issue_date, bill.due_date))
        || (bill.issue_date > bill.due_date && !dateIsInRange(todaysDate, bill.due_date, bill.issue_date));
}

function dateIsInRange(dateToCheckFor, start, end) {
    return dateToCheckFor > start && dateToCheckFor < end;
}

module.exports = { run : runFunc , remind : remindFn }

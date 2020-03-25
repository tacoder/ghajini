var date_helper = require("./date_helper.js");

var getCurrentMonthDate = date_helper.getCurrentMonthDate;
var getNextMonthDate = date_helper.getNextMonthDate;
var getPreviousMonthDate = date_helper.getPreviousMonthDate;

function getKeepRemindingBeforeDateFn(bill, todaysDate) {
    var due_date = getDueDateFn(bill, todaysDate);
    var krbDate = new Date(due_date);
    krbDate.setDate(krbDate.getDate() - bill.keep_reminding_before_days);
    return krbDate
}
  
function getNotifyAfterDateFn(bill, todaysDate) {
    var due_date = getDueDateFn(bill, todaysDate);
    var naDate = new Date(due_date);
    naDate.setDate(naDate.getDate() + bill.notify_after_days);
    return naDate
}  

function getDueDateFn(bill, todaysDate) {
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
  
  function getIssuedDateFn(bill, todaysDate) {
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
  
  module.exports = {
    getDueDate: getDueDateFn,
    getIssuedDate: getIssuedDateFn,
    getKeepRemindingBeforeDate: getKeepRemindingBeforeDateFn,
    getNotifyAfterDate: getNotifyAfterDateFn
  }
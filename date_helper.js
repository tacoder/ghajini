function getPreviousMonthDateFn(todaysDate) {
    var d =  getCurrentMonthDateFn(todaysDate);
    d.setMonth(d.getMonth() - 1 );
    return d;
  }
  
  function getNextMonthDateFn(todaysDate) {
    var d =  getCurrentMonthDateFn(todaysDate);
    d.setMonth(d.getMonth() + 1 );
    return d;
  }
  function getCurrentMonthDateFn(todaysDate) {
    var d = new Date();
    d.setDate(todaysDate);
    return d;
  }
  function dateBetweenFn(dateToCheck, from, to) {
    return from <= dateToCheck && dateToCheck < to;
  }
  
  module.exports = {
    getPreviousMonthDate: getPreviousMonthDateFn,
    getNextMonthDate: getNextMonthDateFn,
    getCurrentMonthDate: getCurrentMonthDateFn,
    dateBetween: dateBetweenFn
  }
  
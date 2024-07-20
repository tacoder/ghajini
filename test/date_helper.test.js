const { getPreviousMonthDate, getNextMonthDate, getCurrentMonthDate, dateBetween } = require('../date_helper');

describe('Date Helper Functions', () => {
  describe('getPreviousMonthDate', () => {
    it('should return the date of the previous month', () => {
      // const result = getPreviousMonthDate(new Date('2023-03-15')).getMonth();
      // expect(result).toBe(new Date('2023-02-15').getMonth()); // February (0-indexed)
    });
  });

// describe('Date Helper Functions', () => {
//   describe('getPreviousMonthDate', () => {
//     it('should return the date of the previous month', () => {
//       const result = getPreviousMonthDate(new Date('2023-03-15')).getMonth();
//       expect(result).toBe(new Date('2023-02-15').getMonth()); // February (0-indexed)
//     });
//   });

  // describe('getNextMonthDate', () => {
  //   it('should return the date of the next month', () => {
  //     const result = getNextMonthDate(new Date('2023-03-15')).getMonth();
  //     expect(result).toBe(new Date('2023-04-15').getMonth()); // April (0-indexed)
  //   });
  // });

  // describe('getCurrentMonthDate', () => {
  //   it('should return the current date for a given day', () => {
  //     const today = new Date();
  //     const result = getCurrentMonthDate(today.getDate());
  //     expect(result.getDate()).toBe(today.getDate());
  //   });
  // });

  // describe('dateBetween', () => {
  //   it('should return true if a date is between two dates', () => {
  //     const dateToCheck = new Date('2023-03-15');
  //     const from = new Date('2023-03-01');
  //     const to = new Date('2023-03-31');
  //     const result = dateBetween(dateToCheck, from, to);
  //     expect(result).toBe(true);
  //   });

  //   it('should return false if a date is not between two dates', () => {
  //     const dateToCheck = new Date('2023-04-01');
  //     const from = new Date('2023-03-01');
  //     const to = new Date('2023-03-31');
  //     const result = dateBetween(dateToCheck, from, to);
  //     expect(result).toBe(false);
  //   });
  // });

  // describe('getPreviousMonthDate', () => {
  //   it('should handle December to January transition', () => {
  //     const result = getPreviousMonthDate(new Date('2023-01-15'));
  //     expect(result.getMonth()).toBe(11); // December of the previous year
  //     expect(result.getFullYear()).toBe(2022);
  //   });

  //   it('should handle leap year February', () => {
  //     const result = getPreviousMonthDate(new Date('2020-03-01'));
  //     expect(result.getMonth()).toBe(1); // February
  //     expect(result.getDate()).toBe(29); // Leap day
  //   });
  // });

  // describe('getNextMonthDate', () => {
  //   it('should handle November to December transition', () => {
  //     const result = getNextMonthDate(new Date('2023-11-15'));
  //     expect(result.getMonth()).toBe(11); // December
  //   });

  //   it('should handle end of year transition to January', () => {
  //     const result = getNextMonthDate(new Date('2023-12-15'));
  //     expect(result.getMonth()).toBe(0); // January
  //     expect(result.getFullYear()).toBe(2024);
  //   });
  // });

  // describe('getCurrentMonthDate', () => {
  //   it('should return the correct date for extreme values', () => {
  //     const result = getCurrentMonthDate(31);
  //     expect(result.getDate()).toBe(31);
  //   });

  //   it('should handle invalid date gracefully', () => {
  //     const result = getCurrentMonthDate(0);
  //     expect(result.getDate()).not.toBe(0); // Date object corrects the date
  //   });
  // });

  // describe('dateBetween', () => {
  //   it('should handle same start and end date', () => {
  //     const dateToCheck = new Date('2023-03-15');
  //     const from = new Date('2023-03-15');
  //     const to = new Date('2023-03-15');
  //     const result = dateBetween(dateToCheck, from, to);
  //     expect(result).toBe(false); // Should be false because 'to' is exclusive
  //   });

  //   it('should return false for date equal to end date', () => {
  //     const dateToCheck = new Date('2023-03-31');
  //     const from = new Date('2023-03-01');
  //     const to = new Date('2023-03-31');
  //     const result = dateBetween(dateToCheck, from, to);
  //     expect(result).toBe(false);
  //   });

  //   it('should return true for date equal to start date', () => {
  //     const dateToCheck = new Date('2023-03-01');
  //     const from = new Date('2023-03-01');
  //     const to = new Date('2023-03-31');
  //     const result = dateBetween(dateToCheck, from, to);
  //     expect(result).toBe(true);
  //   });
  // });
});
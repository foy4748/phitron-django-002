```javascript

// 1

// Reference: https://www.mediabangladesh.net/grading-system-bangladesh/
const grading = (grade) => {
  if (grade >= 80 && grade <= 100) {
    return "A+";
  } else if (grade >= 70 && grade <= 79) {
    return "A";
  } else if (grade >= 60 && grade <= 69) {
    return "A-";
  } else if (grade >= 50 && grade <= 59) {
    return "B";
  } else if (grade >= 40 && grade <= 49) {
    return "C";
  } else if (grade >= 33 && grade <= 39) {
    return "D";
  } else if (grade >= 0 && grade <= 32) {
    return "F";
  } else {
    return null;
  }
};

// 2
const oddOrEven = (num) => (num % 2 ? "ODD" : "EVEN");

// 3
const sortArr = (numArr) => numArr?.sort((a, b) => a - b);

// 4
const isLeapYear = (year) => {
  let leap = false;

  if (year % 4 == 0) leap = true;

  if (year % 100 == 0) leap = false;

  if (year % 400 == 0) leap = true;

  return leap;
};

// 5
const threeOrFive = (arr) =>
  arr?.filter((i) => i != 0 && i % 3 == 0 && i % 5 == 0);

// 6
const largeName = (nameArr) => {
  let current_large = -1;
  if (nameArr.length) {
    current_large = nameArr[0];
    for (let i = 1; i < nameArr.length; i++) {
      if (current_large.length < nameArr[i].length) {
        current_large = nameArr[i];
      }
    }
  }
  return current_large;
};

//  7
const findUnique = (numArr) => {
  const newSet = new Set();
  for (let num of numArr) newSet.add(num);

  const values = newSet.values();
  return Array.from(values);
};

// 8
const largeNumber = (numArr) => {
  let current_large = -1;
  if (numArr.length) {
    current_large = numArr[0];
    for (let i = 1; i < numArr.length; i++) {
      if (current_large < numArr[i]) current_large = numArr[i];
    }
  }
  return current_large;
};

// 9
const monthlySavings = (earnings, livingCost) => {
  // Validation
  if (!Array.isArray(earnings)) return "invalid input";
  if (typeof livingCost != "number" || isNaN(livingCost))
    return "invalid input";

  let remainingPayments = earnings.map((payment) =>
    payment >= 3000 ? (payment * 80) / 100 : payment
  );
  let amountAfterPayingTax = remainingPayments.reduce(
    (acc, num) => acc + num,
    0
  );
  let savings = amountAfterPayingTax - livingCost;
  return savings < 0 ? "earn more" : savings;
};

module.exports = {
  grading,
  oddOrEven,
  sortArr,
  isLeapYear,
  threeOrFive,
  largeName,
  findUnique,
  largeNumber,
  monthlySavings,
};
```

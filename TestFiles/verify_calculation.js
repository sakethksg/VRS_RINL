// RINL VRS Calculation Verification

const basic = 44260;
const da = 100514;
const basicPlusDA = basic + da;

console.log("Basic + DA:", basicPlusDA);

// Per day salary (30 days per month)
const perDaySalary = basicPlusDA / 30;
console.log("Per Day Salary:", perDaySalary.toFixed(2));

// Completed service: 32 years 10 months = 32.833 years (394 months / 12)
const completedYearsDecimal = 32 + (10/12);
console.log("Completed Years (Decimal):", completedYearsDecimal.toFixed(4));

// Remaining service: 2.75 years (33 months / 12)
const remainingYearsDecimal = 33 / 12;
console.log("Remaining Years (Decimal):", remainingYearsDecimal.toFixed(4));

// Compensation 1: 35 days × completed years
const compensation1 = perDaySalary * 35 * completedYearsDecimal;
console.log("\nCompensation 1 (35 days):", compensation1.toFixed(2));
console.log("RINL Compensation 1:", "5,421,786.30");

// Compensation 2: 25 days × remaining years
const compensation2 = perDaySalary * 25 * remainingYearsDecimal;
console.log("\nCompensation 2 (25 days):", compensation2.toFixed(2));
console.log("RINL Compensation 2:", "331,773.75");

// Total 35/25
const total3525 = compensation1 + compensation2;
console.log("\nTotal 35/25:", total3525.toFixed(2));
console.log("RINL Total 35/25:", "5,753,560.05");

// Salary for remaining service
const salaryForRemainingService = basicPlusDA * 33;
console.log("\nSalary for Remaining Service (33 months):", salaryForRemainingService.toFixed(2));
console.log("RINL Salary for Remaining Service:", "4,777,542.00");

// Final VRS Ex-gratia (minimum)
const finalVRS = Math.min(total3525, salaryForRemainingService);
console.log("\nFinal VRS Ex-gratia (Min):", finalVRS.toFixed(2));
console.log("RINL Final VRS Ex-gratia:", "4,777,542.00");

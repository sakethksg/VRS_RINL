// Final verification with RINL method

const basic = 44260;
const da = 100514;
const basicPlusDA = 144774;
const perDaySalary = basicPlusDA / 30;

console.log("=== RINL VRS Calculation Verification ===\n");

console.log("Basic + DA:", basicPlusDA);
console.log("Per Day Salary:", perDaySalary.toFixed(2), "\n");

// RINL Method: Use years.months directly as decimal
const completedYearsRINL = 32.10; // 32 years 10 months
const remainingYearsRINL = 2.09;  // 2 years 9 months (33 months / 12 = 2.75, but RINL shows different)

console.log("Completed Service: 32.10 years");
console.log("Remaining Service: 2.75 years (33 months)\n");

// Compensation 1: 35 days × completed years
const compensation1 = perDaySalary * 35 * completedYearsRINL;
console.log("Compensation 1 (35 days × 32.10):", compensation1.toFixed(2));
console.log("RINL Compensation 1:", "5,421,786.30");
console.log("Match:", compensation1.toFixed(2) === "5421786.30" ? "✓ YES" : "✗ NO", "\n");

// For remaining service, let's check what RINL uses
// RINL shows 2.75 years but let's calculate from 33 months
const remainingDecimal = 33 / 12; // 2.75
const compensation2_decimal = perDaySalary * 25 * remainingDecimal;
console.log("Compensation 2 (25 days × 2.75):", compensation2_decimal.toFixed(2));
console.log("RINL Compensation 2:", "331,773.75");
console.log("Match:", compensation2_decimal.toFixed(2) === "331773.75" ? "✓ YES" : "✗ NO", "\n");

// Total 35/25
const total3525 = compensation1 + compensation2_decimal;
console.log("Total 35/25:", total3525.toFixed(2));
console.log("RINL Total 35/25:", "5,753,560.05");
console.log("Match:", total3525.toFixed(2) === "5753560.05" ? "✓ YES" : "✗ NO", "\n");

// Salary for remaining service (33 months)
const salaryRemaining = basicPlusDA * 33;
console.log("Salary for Remaining Service (33 months):", salaryRemaining.toFixed(2));
console.log("RINL Salary for Remaining Service:", "4,777,542.00");
console.log("Match:", salaryRemaining.toFixed(2) === "4777542.00" ? "✓ YES" : "✗ NO", "\n");

// Final VRS Ex-gratia
const finalVRS = Math.min(total3525, salaryRemaining);
console.log("Final VRS Ex-gratia (Min):", finalVRS.toFixed(2));
console.log("RINL Final VRS Ex-gratia:", "4,777,542.00");
console.log("Match:", finalVRS.toFixed(2) === "4777542.00" ? "✓ YES" : "✗ NO");

// Detailed comparison

const basic = 44260;
const da = 100514;
const basicPlusDA = 144774;
const perDaySalary = basicPlusDA / 30;

console.log("=== Checking Compensation 1 ===");
console.log("Our calculation: perDaySalary * 35 * 32.8333");
console.log(`${perDaySalary.toFixed(2)} * 35 * 32.8333 = ${(perDaySalary * 35 * 32.8333).toFixed(2)}`);
console.log("RINL value: 5,421,786.30");

// Let's reverse engineer RINL's calculation
const rinlComp1 = 5421786.30;
const impliedYears = rinlComp1 / (perDaySalary * 35);
console.log("\nReverse engineering RINL:");
console.log("Implied years from RINL calculation:", impliedYears.toFixed(4));
console.log("Our years: 32.8333");

// Check if RINL uses exact days calculation instead of decimal years
console.log("\n=== Checking if RINL uses exact days ===");
// From 24.08.1993 to 30.09.2025
// Let's calculate completed service more precisely
const doj = new Date('1993-08-24');
const vrsDate = new Date('2025-09-30');
const diffTime = Math.abs(vrsDate - doj);
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
const diffMonths = Math.floor(diffDays / 30.44); // Average month
const diffYears = diffDays / 365.25;

console.log("Days between dates:", diffDays);
console.log("Months (using 30.44 avg):", diffMonths);
console.log("Years (using 365.25):", diffYears.toFixed(4));

// Try with completed years only (not decimal)
console.log("\n=== Using only completed years (32) ===");
const comp1_completed = perDaySalary * 35 * 32;
console.log(`${perDaySalary.toFixed(2)} * 35 * 32 = ${comp1_completed.toFixed(2)}`);

// Try with 32 years 10 months as 32.10
console.log("\n=== Using 32.10 years ===");
const comp1_3210 = perDaySalary * 35 * 32.10;
console.log(`${perDaySalary.toFixed(2)} * 35 * 32.10 = ${comp1_3210.toFixed(2)}`);

// Check what multiplier gives RINL's result
const requiredMultiplier = rinlComp1 / perDaySalary;
console.log("\n=== Required multiplier to match RINL ===");
console.log("Required: perDaySalary * X = 5,421,786.30");
console.log("X =", requiredMultiplier.toFixed(4));
console.log("X / 35 = years:", (requiredMultiplier / 35).toFixed(4));

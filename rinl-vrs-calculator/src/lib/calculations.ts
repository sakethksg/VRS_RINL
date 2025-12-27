import { differenceInMonths, differenceInDays } from 'date-fns';
import type { VRSCalculationInput, VRSCalculationResult } from '@/types';

export function calculateVRSCompensation(input: VRSCalculationInput): VRSCalculationResult {
  const todayDate = new Date();
  
  // Basic + DA
  const basicPlusDA = input.basic + input.da;
  
  // Per day salary (assuming 30 days per month)
  const perDaySalary = basicPlusDA / 30;
  
  // Calculate total Basic + DA until retirement
  const monthsUntilRetirement = differenceInMonths(input.dateOfRetirement, todayDate);
  const basicPlusDAUntilRetirement = basicPlusDA * monthsUntilRetirement;
  
  // Calculate completed years and months of service
  const totalServiceMonths = differenceInMonths(todayDate, input.dateOfJoining);
  const completedYears = Math.floor(totalServiceMonths / 12);
  const completedMonths = totalServiceMonths % 12;
  const completedYearsMonths = `${completedYears} years ${completedMonths} months`;
  // RINL uses years.months format directly as decimal (e.g., 32.10 for 32 years 10 months)
  const completedYearsDecimal = completedYears + (completedMonths / 100);
  
  // Calculate leftover service
  const monthsLeftOut = differenceInMonths(input.dateOfRetirement, todayDate);
  const leftoutYears = Math.floor(monthsLeftOut / 12);
  const leftoutMonths = monthsLeftOut % 12;
  const leftoutYearsMonths = `${leftoutYears} years ${leftoutMonths} months`;
  // RINL uses years.months format directly as decimal (e.g., 2.09 for 2 years 9 months)
  const leftoutYearsDecimal = leftoutYears + (leftoutMonths / 100);
  
  // PF Monthly Contribution (12% of Basic + DA, company contribution)
  const pfMonthlyContribution = basicPlusDA * 0.12;
  
  // SBFP Monthly Contribution (3% of Basic + DA, company contribution)
  const sbfpMonthlyContribution = basicPlusDA * 0.03;
  
  // VRS Compensation - Gujarat Pattern
  // Compensation 1: 35 days for completed years
  const compensation1 = perDaySalary * 35 * completedYearsDecimal;
  
  // Compensation 2: 25 days for leftover years
  const compensation2 = perDaySalary * 25 * leftoutYearsDecimal;
  
  // Total Compensation
  const totalCompensation = compensation1 + compensation2;
  
  // VRS should be less than Basic Plus DA until retirement
  const vrsCompensationFinal = Math.min(totalCompensation, basicPlusDAUntilRetirement);
  
  // After Tax: Rs 5 Lakh non-taxable, 32% tax on remaining
  const taxExemptAmount = 500000;
  const taxableAmount = Math.max(0, vrsCompensationFinal - taxExemptAmount);
  const taxAmount = taxableAmount * 0.32;
  const afterTaxVRS = vrsCompensationFinal - taxAmount;
  
  // Bank interest rate (5.5% annually)
  const bankInterestRate = 0.055;
  
  // Monthly interest from VRS money
  const monthlyInterestFromVRS = (afterTaxVRS * bankInterestRate) / 12;
  
  // Matured amount at retirement (compound interest)
  const yearsUntilRetirement = leftoutYearsDecimal;
  const maturedAmountAtRetirement = afterTaxVRS * Math.pow(1 + bankInterestRate, yearsUntilRetirement);
  
  // Comparison: If employee works till retirement
  // Future Basic, DA, Perks after 32% tax
  const futureBasicDAPlusPerks = basicPlusDAUntilRetirement * (1 - 0.32);
  
  // Future PF and SBFP (tax exempt at retirement)
  const futurePFSBFP = (pfMonthlyContribution + sbfpMonthlyContribution) * monthsLeftOut;
  
  // Total financials if working till retirement
  const totalFinancialsIfWorking = futureBasicDAPlusPerks + futurePFSBFP;
  
  // Loss calculations
  const lossInTakingVRS = basicPlusDAUntilRetirement - vrsCompensationFinal;
  
  const lossAfterTaxes = totalFinancialsIfWorking - afterTaxVRS;
  
  const lossAfterTaxesAndInvestment = totalFinancialsIfWorking - maturedAmountAtRetirement;
  
  return {
    input,
    basicPlusDA,
    perDaySalary,
    basicPlusDAUntilRetirement,
    todayDate,
    completedYearsMonths,
    completedYearsDecimal,
    monthsLeftOut,
    leftoutYearsMonths,
    leftoutYearsDecimal,
    pfMonthlyContribution,
    sbfpMonthlyContribution,
    compensation1,
    compensation2,
    totalCompensation,
    vrsCompensationFinal,
    afterTaxVRS,
    bankInterestRate,
    monthlyInterestFromVRS,
    maturedAmountAtRetirement,
    futureBasicDAPlusPerks,
    futurePFSBFP,
    totalFinancialsIfWorking,
    lossInTakingVRS,
    lossAfterTaxes,
    lossAfterTaxesAndInvestment,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

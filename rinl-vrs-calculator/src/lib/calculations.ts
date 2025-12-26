import { differenceInMonths, addYears } from 'date-fns';
import type { VRSCalculationInput, VRSCalculationResult } from '@/types';

export function calculateVRSCompensation(input: VRSCalculationInput): VRSCalculationResult {
  // Total Basic Pay = Basic Pay + SI + PP
  const totalBasicPay = input.basicPay + input.stagnationIncrement + input.pp;
  
  // Current Salary = Total Basic Pay + DA
  const currentSalary = totalBasicPay + input.da;
  
  // Calculate service years
  const releaseDate = input.releaseDate || new Date();
  const serviceMonths = differenceInMonths(releaseDate, input.dateOfJoining);
  const completedYears = Math.floor(serviceMonths / 12);
  const completedMonths = serviceMonths % 12;
  
  // Calculate superannuation date (58 years)
  const superannuationAge = 58;
  const superannuationDate = addYears(input.dateOfBirth, superannuationAge);
  
  // Leftover service calculation
  const leftoverMonths = differenceInMonths(superannuationDate, releaseDate);
  const leftoverYears = leftoverMonths / 12;
  
  // Gujarat Pattern Calculation
  // 35 days for completed service + 25 days for leftover service
  const dailySalary = currentSalary / 30;
  
  const compensationCompleted = completedYears * 35 * dailySalary;
  const compensationLeftover = leftoverYears * 25 * dailySalary;
  
  const totalCompensation = compensationCompleted + compensationLeftover;
  
  // Minimum compensation: Rs. 25,000 or 250 days salary (whichever higher)
  const minimumCompensation = Math.max(25000, 250 * dailySalary);
  
  // Final compensation (use minimum if total is less)
  const finalCompensation = Math.max(totalCompensation, minimumCompensation);
  
  // Notice Pay (30 days)
  const noticePay = 30 * dailySalary;
  
  // Calculate current age
  const currentAge = differenceInMonths(releaseDate, input.dateOfBirth) / 12;
  
  // Calculate monthly salary
  const monthlySalary = currentSalary;
  
  return {
    input,
    currentAge,
    monthlySalary,
    totalBasicPay,
    currentSalary,
    dailySalary,
    completedYears,
    completedMonths,
    leftoverMonths,
    leftoverYears,
    compensationCompleted,
    compensationLeftover,
    totalCompensation,
    minimumCompensation,
    finalCompensation,
    noticePay,
    totalPayout: finalCompensation + noticePay,
    superannuationDate,
    releaseDate
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

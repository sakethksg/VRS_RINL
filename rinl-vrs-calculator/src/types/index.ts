export interface VRSCalculationInput {
  empName?: string;
  empNo?: string;
  basic: number;
  da: number;
  dateOfJoining: Date;
  dateOfRetirement: Date;
}

export interface VRSCalculationResult {
  input: VRSCalculationInput;
  
  // Basic calculations
  basicPlusDA: number;
  perDaySalary: number;
  basicPlusDAUntilRetirement: number;
  todayDate: Date;
  
  // Service period
  completedYearsMonths: string;
  completedYearsDecimal: number;
  monthsLeftOut: number;
  leftoutYearsMonths: string;
  leftoutYearsDecimal: number;
  
  // PF and SBFP
  pfMonthlyContribution: number;
  sbfpMonthlyContribution: number;
  
  // VRS Compensation (Gujarat Pattern)
  compensation1: number; // 35 days for completed years
  compensation2: number; // 25 days for leftover years
  totalCompensation: number;
  vrsCompensationFinal: number; // Min of totalCompensation and basicPlusDAUntilRetirement
  
  // After tax
  afterTaxVRS: number; // 5 lakh exempt, 32% tax on rest
  
  // Investment calculations
  bankInterestRate: number;
  monthlyInterestFromVRS: number;
  maturedAmountAtRetirement: number;
  
  // Comparison: VRS vs Continue Working
  futureBasicDAPlusPerks: number; // After 32% tax
  futurePFSBFP: number; // Tax exempt at retirement
  totalFinancialsIfWorking: number;
  
  // Loss calculations
  lossInTakingVRS: number;
  lossAfterTaxes: number;
  lossAfterTaxesAndInvestment: number;
}

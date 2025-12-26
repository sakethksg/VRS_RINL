export interface VRSCalculationInput {
  basicPay: number;
  stagnationIncrement: number;
  pp: number;
  da: number;
  dateOfJoining: Date;
  dateOfBirth: Date;
  releaseDate?: Date;
}

export interface VRSCalculationResult {
  totalBasicPay: number;
  currentSalary: number;
  dailySalary: number;
  completedYears: number;
  completedMonths: number;
  leftoverMonths: number;
  leftoverYears: number;
  compensationCompleted: number;
  compensationLeftover: number;
  totalCompensation: number;
  minimumCompensation: number;
  finalCompensation: number;
  noticePay: number;
  totalPayout: number;
  superannuationDate: Date;
  releaseDate: Date;
}

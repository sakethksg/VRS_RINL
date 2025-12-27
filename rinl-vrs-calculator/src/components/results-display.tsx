import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { VRSCalculationResult } from "@/types";
import { formatCurrency } from "@/lib/calculations";

interface ResultsDisplayProps {
  result: VRSCalculationResult;
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* VRS Compensation Card */}
      <Card className="border-2 border-primary">
        <CardHeader className="bg-primary/5 pb-3 sm:pb-6">
          <CardTitle className="text-xl sm:text-2xl">VRS Compensation (After Tax)</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Gujarat Model - Your take-home amount</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary break-words">
            {formatCurrency(result.afterTaxVRS)}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            As of {format(result.todayDate, "MMMM d, yyyy")}
          </p>
        </CardContent>
      </Card>

      {/* Basic Salary Information */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg lg:text-xl">Salary Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Basic Pay</span>
            <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(result.input.basic)}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Dearness Allowance (DA)</span>
            <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(result.input.da)}</span>
          </div>
          <Separator />
          <div className="flex justify-between gap-2">
            <span className="font-medium text-xs sm:text-sm">Basic + DA</span>
            <span className="font-bold text-xs sm:text-sm text-right">{formatCurrency(result.basicPlusDA)}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Per Day Salary</span>
            <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(result.perDaySalary)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Service Details */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg lg:text-xl">Service Period</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Date of Joining</span>
            <span className="font-semibold text-xs sm:text-sm text-right">
              {format(result.input.dateOfJoining, "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Date of Retirement</span>
            <span className="font-semibold text-xs sm:text-sm text-right">
              {format(result.input.dateOfRetirement, "MMM d, yyyy")}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Completed Service</span>
            <span className="font-semibold text-xs sm:text-sm text-right">
              {result.completedYearsMonths}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Leftover Service</span>
            <span className="font-semibold text-xs sm:text-sm text-right">
              {result.leftoutYearsMonths}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* VRS Compensation Breakdown */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg lg:text-xl">VRS Compensation Breakdown</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Gujarat Pattern (35 days + 25 days)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div>
            <div className="flex justify-between gap-2 mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Compensation 1 (35 days × {result.completedYearsDecimal.toFixed(2)} years)
              </span>
              <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(result.compensation1)}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between gap-2 mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Compensation 2 (25 days × {result.leftoutYearsDecimal.toFixed(2)} years)
              </span>
              <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(result.compensation2)}</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between gap-2">
            <span className="font-medium text-xs sm:text-sm">Total Compensation</span>
            <span className="font-bold text-xs sm:text-sm text-right">{formatCurrency(result.totalCompensation)}</span>
          </div>

          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Final VRS Amount</span>
            <span className="text-xs sm:text-sm text-right">{formatCurrency(result.vrsCompensationFinal)}</span>
          </div>

          <Separator />

          <div className="bg-amber-50 p-3 rounded-lg space-y-2">
            <div className="flex justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Tax Exempt (₹5 Lakh)</span>
              <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(500000)}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Taxable Amount</span>
              <span className="font-semibold text-xs sm:text-sm text-right">
                {formatCurrency(Math.max(0, result.vrsCompensationFinal - 500000))}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Tax @ 32%</span>
              <span className="font-semibold text-xs sm:text-sm text-right text-red-600">
                -{formatCurrency(result.vrsCompensationFinal - result.afterTaxVRS)}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between gap-2">
              <span className="font-semibold text-sm sm:text-base">After Tax Amount</span>
              <span className="font-bold text-primary text-sm sm:text-base text-right">
                {formatCurrency(result.afterTaxVRS)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Growth */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg lg:text-xl">Investment Projection</CardTitle>
          <CardDescription className="text-xs sm:text-sm">If VRS amount is invested @ {(result.bankInterestRate * 100).toFixed(1)}% annually</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Monthly Interest</span>
            <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(result.monthlyInterestFromVRS)}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="font-medium text-xs sm:text-sm">Matured Amount at Retirement</span>
            <span className="font-bold text-green-600 text-xs sm:text-sm text-right">{formatCurrency(result.maturedAmountAtRetirement)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Comparison: VRS vs Continue Working */}
      <Card className="border-2 border-orange-300">
        <CardHeader className="bg-orange-50 pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg lg:text-xl">Comparison: VRS vs Continue Working</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Financial analysis if you work till retirement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-2">If You Continue Working:</h4>
            <div className="space-y-2 pl-3 border-l-2 border-orange-200">
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground text-xs sm:text-sm">Basic + DA (after 32% tax)</span>
                <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(result.futureBasicDAPlusPerks)}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground text-xs sm:text-sm">PF + SBFP (tax exempt)</span>
                <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(result.futurePFSBFP)}</span>
              </div>
              <Separator />
              <div className="flex justify-between gap-2">
                <span className="font-bold text-xs sm:text-sm">Total if Working</span>
                <span className="font-bold text-green-600 text-xs sm:text-sm text-right">
                  {formatCurrency(result.totalFinancialsIfWorking)}
                </span>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Loss Analysis */}
          <div className="bg-red-50 p-4 rounded-lg space-y-3">
            <h4 className="font-semibold text-sm sm:text-base text-red-800">Loss Analysis</h4>
            
            <div className="flex justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Loss (Before Tax)</span>
              <span className="font-semibold text-xs sm:text-sm text-red-600 text-right">
                {formatCurrency(result.lossInTakingVRS)}
              </span>
            </div>

            <div className="flex justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Loss (After Taxes)</span>
              <span className="font-bold text-sm text-red-600 text-right">
                {formatCurrency(result.lossAfterTaxes)}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between gap-2 items-start">
              <span className="text-xs sm:text-sm font-medium">Loss (After Taxes + Investment @ {(result.bankInterestRate * 100).toFixed(1)}%)</span>
              <span className="font-bold text-base sm:text-lg text-red-700 text-right">
                {formatCurrency(result.lossAfterTaxesAndInvestment)}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg mt-4">
            <p className="text-xs sm:text-sm text-blue-800">
              <strong>Note:</strong> Even with {(result.bankInterestRate * 100).toFixed(1)}% annual returns on VRS amount, you would be at a 
              loss of {formatCurrency(result.lossAfterTaxesAndInvestment)} compared to continuing employment till retirement.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

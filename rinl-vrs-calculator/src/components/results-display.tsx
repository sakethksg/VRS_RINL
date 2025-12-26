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
      {/* Summary Card */}
      <Card className="border-2 border-primary">
        <CardHeader className="bg-primary/5 pb-3 sm:pb-6">
          <CardTitle className="text-xl sm:text-2xl">Total VRS Payout</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Your complete compensation package</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary break-words">
            {formatCurrency(result.totalPayout)}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            As of {format(result.releaseDate, "MMMM d, yyyy")}
          </p>
        </CardContent>
      </Card>

      {/* Salary Details */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg lg:text-xl">Salary Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Total Basic Pay</span>
            <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(result.totalBasicPay)}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Current Salary (with DA)</span>
            <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(result.currentSalary)}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Daily Salary</span>
            <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(result.dailySalary)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Service Details */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg lg:text-xl">Service Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Completed Service</span>
            <span className="font-semibold text-xs sm:text-sm text-right">
              {result.completedYears} years, {result.completedMonths} months
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Superannuation Date</span>
            <span className="font-semibold text-xs sm:text-sm text-right">
              {format(result.superannuationDate, "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Leftover Service</span>
            <span className="font-semibold text-xs sm:text-sm text-right">
              {Math.floor(result.leftoverYears)} years, {Math.round((result.leftoverYears % 1) * 12)} months
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Compensation Breakdown */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg lg:text-xl">Compensation Breakdown</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Gujarat Pattern calculation (35 days + 25 days)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div>
            <div className="flex justify-between gap-2 mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Completed Service ({result.completedYears} years × 35 days)
              </span>
              <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(result.compensationCompleted)}</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full"
                style={{ 
                  width: `${(result.compensationCompleted / result.totalCompensation) * 100}%` 
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between gap-2 mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Leftover Service ({result.leftoverYears.toFixed(1)} years × 25 days)
              </span>
              <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(result.compensationLeftover)}</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-full"
                style={{ 
                  width: `${(result.compensationLeftover / result.totalCompensation) * 100}%` 
                }}
              />
            </div>
          </div>

          <Separator />

          <div className="flex justify-between gap-2">
            <span className="font-medium text-xs sm:text-sm">Total Compensation</span>
            <span className="font-bold text-xs sm:text-sm text-right">{formatCurrency(result.totalCompensation)}</span>
          </div>

          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Minimum Guarantee</span>
            <span className="text-xs sm:text-sm text-right">{formatCurrency(result.minimumCompensation)}</span>
          </div>

          <Separator />

          <div className="flex justify-between gap-2">
            <span className="font-semibold text-sm sm:text-base lg:text-lg">Final Compensation</span>
            <span className="font-bold text-primary text-sm sm:text-base lg:text-lg text-right">
              {formatCurrency(result.finalCompensation)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Notice Pay */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg lg:text-xl">Additional Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Notice Pay (30 days)</span>
            <span className="font-semibold text-xs sm:text-sm text-right">{formatCurrency(result.noticePay)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Print Instructions */}
      <Card className="bg-muted/50">
        <CardContent className="pt-4 sm:pt-6 px-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            💡 Use your browser's print function (Ctrl+P / Cmd+P) to save or print this calculation
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

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
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="border-2 border-primary">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-2xl">Total VRS Payout</CardTitle>
          <CardDescription>Your complete compensation package</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-4xl font-bold text-primary">
            {formatCurrency(result.totalPayout)}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            As of {format(result.releaseDate, "MMMM d, yyyy")}
          </p>
        </CardContent>
      </Card>

      {/* Salary Details */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Basic Pay</span>
            <span className="font-semibold">{formatCurrency(result.totalBasicPay)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Current Salary (with DA)</span>
            <span className="font-semibold">{formatCurrency(result.currentSalary)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Daily Salary</span>
            <span className="font-semibold">{formatCurrency(result.dailySalary)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Service Details */}
      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Completed Service</span>
            <span className="font-semibold">
              {result.completedYears} years, {result.completedMonths} months
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Superannuation Date</span>
            <span className="font-semibold">
              {format(result.superannuationDate, "MMMM d, yyyy")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Leftover Service</span>
            <span className="font-semibold">
              {Math.floor(result.leftoverYears)} years, {Math.round((result.leftoverYears % 1) * 12)} months
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Compensation Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Compensation Breakdown</CardTitle>
          <CardDescription>Gujarat Pattern calculation (35 days + 25 days)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Completed Service ({result.completedYears} years × 35 days)
              </span>
              <span className="font-semibold">{formatCurrency(result.compensationCompleted)}</span>
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
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Leftover Service ({result.leftoverYears.toFixed(1)} years × 25 days)
              </span>
              <span className="font-semibold">{formatCurrency(result.compensationLeftover)}</span>
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

          <div className="flex justify-between">
            <span className="font-medium">Total Compensation</span>
            <span className="font-bold">{formatCurrency(result.totalCompensation)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Minimum Guarantee</span>
            <span>{formatCurrency(result.minimumCompensation)}</span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg">
            <span className="font-semibold">Final Compensation</span>
            <span className="font-bold text-primary">
              {formatCurrency(result.finalCompensation)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Notice Pay */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Notice Pay (30 days)</span>
            <span className="font-semibold">{formatCurrency(result.noticePay)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Print Instructions */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            💡 Use your browser's print function (Ctrl+P / Cmd+P) to save or print this calculation
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

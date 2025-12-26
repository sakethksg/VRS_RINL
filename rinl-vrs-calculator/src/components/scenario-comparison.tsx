"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateVRSCompensation, formatCurrency } from "@/lib/calculations";
import type { VRSCalculationInput } from "@/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { addMonths } from "date-fns";

interface ScenarioComparisonProps {
  input: VRSCalculationInput;
}

export function ScenarioComparison({ input }: ScenarioComparisonProps) {
  // Calculate current scenario
  const currentScenario = calculateVRSCompensation(input);
  
  // Calculate future scenario (6 months later)
  const futureInput = {
    ...input,
    releaseDate: input.releaseDate ? addMonths(input.releaseDate, 6) : new Date(),
  };
  const futureScenario = calculateVRSCompensation(futureInput);
  
  const currentTotal = currentScenario.finalCompensation + currentScenario.noticePay;
  const futureTotal = futureScenario.finalCompensation + futureScenario.noticePay;
  const difference = futureTotal - currentTotal;
  const percentageChange = ((difference / currentTotal) * 100).toFixed(2);
  
  const chartData = [
    {
      name: 'VRS Today',
      'Total Compensation': currentScenario.finalCompensation,
      'Notice Pay': currentScenario.noticePay,
    },
    {
      name: 'VRS After 6 Months',
      'Total Compensation': futureScenario.finalCompensation,
      'Notice Pay': futureScenario.noticePay,
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl">Scenario Comparison</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Compare VRS benefits: Today vs 6 Months Later
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-3 sm:p-4 rounded-lg">
            <h4 className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2">Scenario A: VRS Today</h4>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm">
                <span className="text-muted-foreground">Compensation:</span>{" "}
                <span className="font-semibold">{formatCurrency(currentScenario.finalCompensation)}</span>
              </p>
              <p className="text-xs sm:text-sm">
                <span className="text-muted-foreground">Notice Pay:</span>{" "}
                <span className="font-semibold">{formatCurrency(currentScenario.noticePay)}</span>
              </p>
              <p className="text-sm sm:text-base font-bold text-primary mt-2">
                Total: {formatCurrency(currentTotal)}
              </p>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/30 p-3 sm:p-4 rounded-lg">
            <h4 className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2">Scenario B: VRS After 6 Months</h4>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm">
                <span className="text-muted-foreground">Compensation:</span>{" "}
                <span className="font-semibold">{formatCurrency(futureScenario.finalCompensation)}</span>
              </p>
              <p className="text-xs sm:text-sm">
                <span className="text-muted-foreground">Notice Pay:</span>{" "}
                <span className="font-semibold">{formatCurrency(futureScenario.noticePay)}</span>
              </p>
              <p className="text-sm sm:text-base font-bold text-primary mt-2">
                Total: {formatCurrency(futureTotal)}
              </p>
            </div>
          </div>
        </div>

        {/* Analysis */}
        <div className={`p-3 sm:p-4 rounded-lg ${difference > 0 ? 'bg-green-50 dark:bg-green-950/20' : 'bg-blue-50 dark:bg-blue-950/20'}`}>
          <h4 className="font-semibold mb-2 text-sm sm:text-base">Analysis</h4>
          <p className="text-xs sm:text-sm">
            {difference > 0 ? (
              <>
                <strong>Waiting 6 months</strong> provides <strong>{formatCurrency(Math.abs(difference))}</strong> more 
                ({percentageChange}% increase). This is because you'll complete an additional 6 months of service, 
                which adds to your completed service compensation.
              </>
            ) : difference < 0 ? (
              <>
                <strong>Taking VRS today</strong> provides <strong>{formatCurrency(Math.abs(difference))}</strong> more 
                ({Math.abs(parseFloat(percentageChange))}% more). This is due to having more leftover service remaining.
              </>
            ) : (
              <>
                Both scenarios provide the <strong>same payout</strong>. The gain from additional completed service 
                is offset by reduced leftover service.
              </>
            )}
          </p>
        </div>

        {/* Bar Chart */}
        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" style={{ fontSize: '12px' }} />
              <YAxis 
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
              />
              <Tooltip 
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{ fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Total Compensation" fill="#f97316" />
              <Bar dataKey="Notice Pay" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-muted-foreground">
          💡 <strong>Tip:</strong> Consider salary during waiting period, job security, and personal circumstances 
          when making your decision.
        </p>
      </CardContent>
    </Card>
  );
}

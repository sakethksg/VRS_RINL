"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/calculations";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PayoutVsAgeChartProps {
  currentAge: number;
  retirementAge: number;
  vrsAmount: number;
  monthlySalary: number;
}

export function PayoutVsAgeChart({ 
  currentAge, 
  retirementAge, 
  vrsAmount, 
  monthlySalary 
}: PayoutVsAgeChartProps) {
  // Calculate cumulative salary if employee stays
  const generateChartData = () => {
    const data = [];
    let cumulativeSalary = 0;
    
    for (let age = Math.floor(currentAge); age <= retirementAge; age++) {
      if (age > currentAge) {
        cumulativeSalary += monthlySalary * 12;
      }
      
      data.push({
        age,
        'VRS Amount': vrsAmount,
        'Cumulative Salary (If Stay)': Math.round(cumulativeSalary),
      });
    }
    
    return data;
  };

  const chartData = generateChartData();
  const yearsToRetirement = retirementAge - currentAge;
  const totalIfStay = monthlySalary * 12 * yearsToRetirement;
  const breakEvenYears = Math.ceil(vrsAmount / (monthlySalary * 12));

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl">VRS vs Continuing Service</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Compare immediate VRS payout with total salary if you continue working
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 sm:p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">VRS Amount (Today)</p>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-orange-600 dark:text-orange-400">
              {formatCurrency(vrsAmount)}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 sm:p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total if Stay ({yearsToRetirement.toFixed(1)} yrs)</p>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(totalIfStay)}
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 p-3 sm:p-4 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Break-even Period</p>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-green-600 dark:text-green-400">
              {breakEvenYears} years
            </p>
          </div>
        </div>

        {/* Chart */}
        <div>
          <h4 className="font-semibold mb-3 text-sm sm:text-base">Financial Comparison by Age</h4>
          <div className="w-full h-[350px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="age" 
                  label={{ value: 'Age (Years)', position: 'insideBottom', offset: -10, style: { fontSize: '11px' } }}
                  style={{ fontSize: '11px' }}
                  tick={{ dy: 5 }}
                />
                <YAxis 
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  style={{ fontSize: '11px' }}
                  width={65}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{ fontSize: '11px' }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                  iconSize={10}
                />
                <Line 
                  type="monotone" 
                  dataKey="VRS Amount" 
                  stroke="#f97316" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="Cumulative Salary (If Stay)" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Analysis */}
        <div className="space-y-3">
          <div className="bg-muted/50 p-3 sm:p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm sm:text-base">Financial Analysis</h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <p>
                📊 <strong>Current Situation:</strong> You are {currentAge.toFixed(1)} years old with{" "}
                {yearsToRetirement.toFixed(1)} years until retirement.
              </p>
              
              {vrsAmount > totalIfStay ? (
                <p>
                  ✅ <strong>VRS Advantage:</strong> Taking VRS gives you{" "}
                  <strong className="text-green-600 dark:text-green-400">
                    {formatCurrency(vrsAmount - totalIfStay)}
                  </strong>{" "}
                  more than staying until retirement. This is <strong>financially beneficial</strong>.
                </p>
              ) : (
                <p>
                  ⚠️ <strong>Salary Advantage:</strong> Staying until retirement will earn you{" "}
                  <strong className="text-blue-600 dark:text-blue-400">
                    {formatCurrency(totalIfStay - vrsAmount)}
                  </strong>{" "}
                  more than VRS. However, consider the <strong>time value of money</strong> and 
                  investment opportunities.
                </p>
              )}

              <p>
                ⏳ <strong>Break-even:</strong> The cumulative salary will equal your VRS amount 
                after <strong>{breakEvenYears} years</strong> of continued service.
              </p>

              <p>
                💡 <strong>Key Insight:</strong> While the chart shows raw salary comparison, remember 
                that VRS money received today can be invested to generate returns (see Investment Simulator below). 
                Additionally, consider non-financial factors like job satisfaction, health, and personal goals.
              </p>
            </div>
          </div>

          {/* Decision Factors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
              <h5 className="font-semibold text-xs sm:text-sm mb-2 text-green-700 dark:text-green-300">
                ✅ Reasons to Take VRS
              </h5>
              <ul className="text-xs space-y-1 text-green-900 dark:text-green-100">
                <li>• Immediate lump sum for investment</li>
                <li>• Time value of money advantage</li>
                <li>• Pursue new opportunities</li>
                <li>• Better work-life balance</li>
              </ul>
            </div>

            <div className="border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
              <h5 className="font-semibold text-xs sm:text-sm mb-2 text-orange-700 dark:text-orange-300">
                ⚠️ Reasons to Continue
              </h5>
              <ul className="text-xs space-y-1 text-orange-900 dark:text-orange-100">
                <li>• Guaranteed monthly income</li>
                <li>• Job security & benefits</li>
                <li>• Pension eligibility</li>
                <li>• Healthcare coverage</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          ℹ️ <strong>Note:</strong> This analysis considers only base salary and doesn't account 
          for future increments, allowances, gratuity, pension, or other retirement benefits. 
          Consult HR and a financial advisor for a complete picture.
        </p>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/calculations";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface InvestmentSimulatorProps {
  vrsAmount: number;
}

export function InvestmentSimulator({ vrsAmount }: InvestmentSimulatorProps) {
  const [fdRate, setFdRate] = useState(6.5);
  const [mfRate, setMfRate] = useState(12);
  const [duration, setDuration] = useState(10);

  const calculateInvestment = (principal: number, rate: number, years: number) => {
    const data = [];
    for (let year = 0; year <= years; year++) {
      const amount = principal * Math.pow(1 + rate / 100, year);
      data.push({
        year,
        amount: Math.round(amount),
      });
    }
    return data;
  };

  const fdData = calculateInvestment(vrsAmount, fdRate, duration);
  const mfData = calculateInvestment(vrsAmount, mfRate, duration);

  const finalFD = fdData[duration].amount;
  const finalMF = mfData[duration].amount;
  const profitFD = finalFD - vrsAmount;
  const profitMF = finalMF - vrsAmount;

  // Combine data for chart
  const chartData = fdData.map((fd, index) => ({
    year: fd.year,
    'Fixed Deposit': fd.amount,
    'Mutual Fund': mfData[index].amount,
  }));

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl">VRS Investment Simulator</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          See how your VRS payout can grow with different investment options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <Label htmlFor="fd-rate" className="text-xs sm:text-sm">Fixed Deposit Rate (%)</Label>
            <Input
              id="fd-rate"
              type="number"
              value={fdRate}
              onChange={(e) => setFdRate(Number(e.target.value) || 0)}
              className="text-sm sm:text-base mt-1"
              step="0.1"
              min="0"
              max="20"
            />
            <p className="text-xs text-muted-foreground mt-1">Safe return: 6-7%</p>
          </div>

          <div>
            <Label htmlFor="mf-rate" className="text-xs sm:text-sm">Mutual Fund Rate (%)</Label>
            <Input
              id="mf-rate"
              type="number"
              value={mfRate}
              onChange={(e) => setMfRate(Number(e.target.value) || 0)}
              className="text-sm sm:text-base mt-1"
              step="0.1"
              min="0"
              max="30"
            />
            <p className="text-xs text-muted-foreground mt-1">Expected: 10-12%</p>
          </div>

          <div>
            <Label htmlFor="duration" className="text-xs sm:text-sm">Duration (Years)</Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value) || 1)}
              className="text-sm sm:text-base mt-1"
              min="1"
              max="30"
            />
            <p className="text-xs text-muted-foreground mt-1">Investment period</p>
          </div>
        </div>

        {/* Initial Amount */}
        <div className="bg-muted/50 p-3 sm:p-4 rounded-lg">
          <p className="text-xs sm:text-sm text-muted-foreground">Initial VRS Amount</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">{formatCurrency(vrsAmount)}</p>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 p-3 sm:p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm sm:text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              Fixed Deposit ({fdRate}%)
            </h4>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm">
                <span className="text-muted-foreground">Final Amount:</span>{" "}
                <span className="font-bold">{formatCurrency(finalFD)}</span>
              </p>
              <p className="text-xs sm:text-sm">
                <span className="text-muted-foreground">Profit:</span>{" "}
                <span className="font-bold text-green-600 dark:text-green-400">{formatCurrency(profitFD)}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                ({((profitFD / vrsAmount) * 100).toFixed(1)}% gain)
              </p>
            </div>
          </div>

          <div className="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-3 sm:p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm sm:text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Mutual Fund ({mfRate}%)
            </h4>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm">
                <span className="text-muted-foreground">Final Amount:</span>{" "}
                <span className="font-bold">{formatCurrency(finalMF)}</span>
              </p>
              <p className="text-xs sm:text-sm">
                <span className="text-muted-foreground">Profit:</span>{" "}
                <span className="font-bold text-green-600 dark:text-green-400">{formatCurrency(profitMF)}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                ({((profitMF / vrsAmount) * 100).toFixed(1)}% gain)
              </p>
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <div>
          <h4 className="font-semibold mb-3 text-sm sm:text-base">Investment Growth Over Time</h4>
          <div className="w-full h-[300px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="year" 
                  label={{ value: 'Years', position: 'insideBottom', offset: -5, style: { fontSize: '12px' } }}
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{ fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="Fixed Deposit" stroke="#f97316" strokeWidth={2} />
                <Line type="monotone" dataKey="Mutual Fund" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Analysis */}
        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 sm:p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-sm sm:text-base">Investment Analysis</h4>
          <p className="text-xs sm:text-sm">
            Over {duration} years, a mutual fund investment could earn you{" "}
            <strong>{formatCurrency(profitMF - profitFD)}</strong> more than a fixed deposit. 
            However, mutual funds carry market risk, while FDs are safer. Consider diversifying 
            your investment across both options based on your risk appetite.
          </p>
        </div>

        <p className="text-xs text-muted-foreground">
          ⚠️ <strong>Note:</strong> These are projected returns based on assumed rates. 
          Actual returns may vary. Consult a financial advisor before making investment decisions.
        </p>
      </CardContent>
    </Card>
  );
}

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/calculations";
import type { VRSCalculationResult } from "@/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CompensationBreakdownChartProps {
  result: VRSCalculationResult;
}

const COLORS = ['#f97316', '#3b82f6', '#10b981'];

export function CompensationBreakdownChart({ result }: CompensationBreakdownChartProps) {
  const data = [
    { name: 'Completed Service', value: result.compensationCompleted },
    { name: 'Remaining Service', value: result.compensationLeftover },
    { name: 'Notice Pay', value: result.noticePay },
  ];

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg lg:text-xl">Compensation Breakdown</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Visual breakdown of your VRS payout components
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[350px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                labelLine={false}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                layout="horizontal"
                verticalAlign="bottom"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[0] }}></span>
              Completed Service
            </span>
            <span className="font-semibold">{formatCurrency(result.compensationCompleted)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[1] }}></span>
              Remaining Service
            </span>
            <span className="font-semibold">{formatCurrency(result.compensationLeftover)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[2] }}></span>
              Notice Pay
            </span>
            <span className="font-semibold">{formatCurrency(result.noticePay)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

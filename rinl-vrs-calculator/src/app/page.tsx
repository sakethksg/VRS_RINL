"use client";

import { useState } from "react";
import { CalculatorForm } from "@/components/calculator-form";
import { ResultsDisplay } from "@/components/results-display";
import { ScenarioComparison } from "@/components/scenario-comparison";
import { CompensationBreakdownChart } from "@/components/compensation-breakdown-chart";
import { PayoutVsAgeChart } from "@/components/payout-vs-age-chart";
import { InvestmentSimulator } from "@/components/investment-simulator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { calculateVRSCompensation } from "@/lib/calculations";
import type { VRSCalculationInput, VRSCalculationResult } from "@/types";

export default function Home() {
  const [result, setResult] = useState<VRSCalculationResult | null>(null);

  const handleCalculate = (input: VRSCalculationInput) => {
    const calculationResult = calculateVRSCompensation(input);
    setResult(calculationResult);
    // Scroll to results on mobile
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">RINL VRS Calculator</h1>
              <p className="text-xs sm:text-sm opacity-90 mt-1">
                Rashtriya Ispat Nigam Limited - Voluntary Retirement Scheme
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="text-right">
                <div className="text-base lg:text-lg font-semibold">Visakhapatnam Steel Plant</div>
                <div className="text-xs lg:text-sm opacity-90">A Govt. of India Enterprise</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <Card className="mb-4 sm:mb-6 lg:mb-8">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl">Calculate Your VRS Compensation</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                This calculator helps you estimate your Voluntary Retirement Scheme benefits based on the Gujarat Pattern. 
                Enter your salary details and dates to get an instant calculation.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - Form */}
            <div>
              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-base sm:text-lg lg:text-xl">Employee Details</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Fill in your current salary and service information</CardDescription>
                </CardHeader>
                <CardContent className="px-3 sm:px-6">
                  <CalculatorForm onCalculate={handleCalculate} />
                </CardContent>
              </Card>

              {/* Information Card */}
              <Card className="mt-4 sm:mt-6 bg-blue-50 dark:bg-blue-950/30">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-sm sm:text-base">How is it calculated?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs sm:text-sm px-3 sm:px-6">
                  <p>
                    <strong>Gujarat Pattern:</strong> 35 days salary for each completed year of service + 
                    25 days salary for each year of remaining service (until superannuation at 58 years)
                  </p>
                  <p>
                    <strong>Minimum Guarantee:</strong> ₹25,000 or 250 days salary, whichever is higher
                  </p>
                  <p>
                    <strong>Notice Pay:</strong> Additional 30 days salary
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Results */}
            <div id="results">
              {result ? (
                <ResultsDisplay result={result} />
              ) : (
                <Card className="h-full flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
                  <CardContent className="text-center py-8 sm:py-12 px-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Ready to Calculate</h3>
                    <p className="text-muted-foreground max-w-md text-xs sm:text-sm">
                      Fill in the form above and click "Calculate VRS Compensation" to see your results here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Advanced Analysis Section - Only show when results are available */}
          {result && (
            <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
              <Separator className="my-6 sm:my-8" />
              
              {/* Section Header */}
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Advanced Analysis Tools</h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                  Use these tools to make an informed decision about your VRS
                </p>
              </div>

              {/* Scenario Comparison */}
              <ScenarioComparison input={result.input} />

              {/* Compensation Breakdown Chart */}
              <CompensationBreakdownChart result={result} />

              {/* Payout vs Age Analysis */}
              <PayoutVsAgeChart
                currentAge={result.currentAge}
                retirementAge={58}
                vrsAmount={result.totalCompensation}
                monthlySalary={result.monthlySalary}
              />

              {/* Investment Simulator */}
              <InvestmentSimulator vrsAmount={result.totalCompensation + result.noticePay} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 mt-8 sm:mt-12 lg:mt-16 py-4 sm:py-6">
        <div className="container mx-auto px-3 sm:px-4 text-center text-xs sm:text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} RINL - Rashtriya Ispat Nigam Limited</p>
          <p className="mt-1">For informational purposes only</p>
        </div>
      </footer>
    </div>
  );
}

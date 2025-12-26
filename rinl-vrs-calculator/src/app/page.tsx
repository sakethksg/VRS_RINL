"use client";

import { useState } from "react";
import { CalculatorForm } from "@/components/calculator-form";
import { ResultsDisplay } from "@/components/results-display";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">RINL VRS Calculator</h1>
              <p className="text-sm opacity-90 mt-1">
                Rashtriya Ispat Nigam Limited - Voluntary Retirement Scheme
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <div className="text-lg font-semibold">Visakhapatnam Steel Plant</div>
                <div className="text-sm opacity-90">A Govt. of India Enterprise</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Calculate Your VRS Compensation</CardTitle>
              <CardDescription>
                This calculator helps you estimate your Voluntary Retirement Scheme benefits based on the Gujarat Pattern. 
                Enter your salary details and dates to get an instant calculation.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Employee Details</CardTitle>
                  <CardDescription>Fill in your current salary and service information</CardDescription>
                </CardHeader>
                <CardContent>
                  <CalculatorForm onCalculate={handleCalculate} />
                </CardContent>
              </Card>

              {/* Information Card */}
              <Card className="mt-6 bg-blue-50 dark:bg-blue-950/30">
                <CardHeader>
                  <CardTitle className="text-base">How is it calculated?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
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
                <Card className="h-full flex items-center justify-center">
                  <CardContent className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">Ready to Calculate</h3>
                    <p className="text-muted-foreground max-w-md">
                      Fill in the form on the left and click "Calculate VRS Compensation" to see your results here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Footer Note */}
          <Card className="mt-8 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="pt-6">
              <p className="text-sm text-center text-muted-foreground">
                ⚠️ <strong>Disclaimer:</strong> This calculator provides an estimate based on the Gujarat Pattern formula. 
                Actual VRS benefits may vary based on company policy, government regulations, and individual circumstances. 
                Please consult with HR department for official calculations.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 mt-16 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} RINL - Rashtriya Ispat Nigam Limited</p>
          <p className="mt-1">For informational purposes only</p>
        </div>
      </footer>
    </div>
  );
}

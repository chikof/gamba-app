'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface IncomeChartsProps {
  monthlyIncome: { [key: string]: number };
  overallIncome: number;
}

export function OverallIncomeCard({ overallIncome }: { overallIncome: number }) {
  return (
    <Card className="h-24">
      <CardHeader className="p-3">
        <CardTitle className="text-sm">Overall Income</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className={`text-2xl font-bold ${overallIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${overallIncome.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
}

export function MonthlyIncomeCard({ monthlyIncome }: { monthlyIncome: { [key: string]: number } }) {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const currentMonthIncome = monthlyIncome[currentMonth] || 0;

  return (
    <Card className="h-24">
      <CardHeader className="p-3">
        <CardTitle className="text-sm">Current Month</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className={`text-2xl font-bold ${currentMonthIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${currentMonthIncome.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
}

export default function IncomeCharts({ monthlyIncome, overallIncome }: IncomeChartsProps) {
  const monthlyData = Object.entries(monthlyIncome)
    .map(([month, income]) => ({
      month,
      income,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Income</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Income']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Bar dataKey="income" fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}


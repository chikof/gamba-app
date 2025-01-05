'use client';

import {
	Bar,
	BarChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Tooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IncomeChartsProps {
	monthlyIncome: { [key: string]: number };
	overallIncome: number;
}

export function OverallIncomeCard({
	overallIncome
}: { overallIncome: number }) {
	return <IncomeCard income={overallIncome} title="Overall" />;
}

export function IncomeCard({
	income,
	title
}: { income: number; title: string }) {
	return (
		<Card className="h-24">
			<CardHeader className="p-3">
				<CardTitle className="text-sm">{title}</CardTitle>
			</CardHeader>
			<CardContent className="p-3 pt-0">
				<p
					className={`text-2xl font-bold ${income >= 0 ? 'text-green-600' : 'text-red-600'}`}
				>
					${income.toFixed(2)}
				</p>
			</CardContent>
		</Card>
	);
}

export function DailyIncomeCard({
	monthlyIncome
}: { monthlyIncome: { [key: string]: number } }) {
	const today = new Date().toISOString().split('T')[0];
	const todayIncome = monthlyIncome[today] || 0;

	return <IncomeCard income={todayIncome} title="Today" />;
}

export function MonthlyIncomeCard({
	monthlyIncome
}: { monthlyIncome: { [key: string]: number } }) {
	const currentMonth = new Date().toISOString().slice(0, 7);
	const currentMonthIncome = monthlyIncome[currentMonth] || 0;

	return <IncomeCard income={currentMonthIncome} title="Month" />;
}

export default function IncomeCharts({ monthlyIncome }: IncomeChartsProps) {
	const monthlyData = Object.entries(monthlyIncome)
		.map(([month, income]) => ({
			month,
			income
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
								formatter={(value) => [
									`$${Number(value).toFixed(2)}`,
									'Income'
								]}
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

'use client';

import { useState, useEffect } from 'react';
import { getTransactions } from '@/lib/store';
import { calculateIncome } from '@/lib/calculateIncome';
import TransactionForm from '@/components/TransactionForm';
import TransactionTable from '@/components/TransactionTable';
import IncomeCharts, {
	OverallIncomeCard,
	MonthlyIncomeCard,
	DailyIncomeCard
} from '@/components/IncomeCharts';
import Navbar from '@/components/Navbar';
import type { Transaction } from '@/types/transaction';

export default function Home() {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [monthlyIncome, setMonthlyIncome] = useState<{
		[key: string]: number;
	}>({});
	const [overallIncome, setOverallIncome] = useState(0);

	useEffect(() => {
		const initialTransactions = getTransactions();
		const { monthlyIncome, overallIncome } =
			calculateIncome(initialTransactions);
		setTransactions(initialTransactions);
		setMonthlyIncome(monthlyIncome);
		setOverallIncome(overallIncome);
	}, []);

	const handleNewTransaction = (newData: {
		transactions: Transaction[];
		monthlyIncome: { [key: string]: number };
		overallIncome: number;
	}) => {
		setTransactions(newData.transactions);
		setMonthlyIncome(newData.monthlyIncome);
		setOverallIncome(newData.overallIncome);
	};

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="grow container mx-auto p-4">
				<div className="flex flex-col md:flex-row gap-4">
					<div className="w-full md:w-1/2">
						<TransactionTable transactions={transactions} />
					</div>
					<div className="w-full md:w-1/2">
						<div className="grid grid-cols-3 gap-4 mb-4">
							<OverallIncomeCard overallIncome={overallIncome} />
							<MonthlyIncomeCard monthlyIncome={monthlyIncome} />
							<DailyIncomeCard monthlyIncome={monthlyIncome} />
						</div>
						<div className="mb-4">
							<TransactionForm
								onNewTransactionAction={handleNewTransaction}
							/>
						</div>
						<IncomeCharts
							monthlyIncome={monthlyIncome}
							overallIncome={overallIncome}
						/>
					</div>
				</div>
			</main>
		</div>
	);
}

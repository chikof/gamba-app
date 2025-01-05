import type { Transaction } from '@/types/transaction';

export function calculateIncome(transactions: Transaction[]) {
	const monthlyIncome: { [key: string]: number } = {};
	let overallIncome = 0;

	for (const transaction of transactions) {
		const monthYear = transaction.date.slice(0, 7);

		if (!monthlyIncome[monthYear]) {
			monthlyIncome[monthYear] = 0;
		}

		monthlyIncome[monthYear] += transaction.amount;
		overallIncome += transaction.amount;
	}

	return { monthlyIncome, overallIncome };
}

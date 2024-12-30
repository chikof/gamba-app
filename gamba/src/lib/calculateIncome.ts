import { Transaction } from '@/types/transaction';

export function calculateIncome(transactions: Transaction[]) {
  const monthlyIncome: { [key: string]: number } = {};
  let overallIncome = 0;

  transactions.forEach((transaction) => {
    const monthYear = transaction.date.substring(0, 7); // YYYY-MM

    if (!monthlyIncome[monthYear]) {
      monthlyIncome[monthYear] = 0;
    }

    monthlyIncome[monthYear] += transaction.amount;
    overallIncome += transaction.amount;
  });

  return { monthlyIncome, overallIncome };
}


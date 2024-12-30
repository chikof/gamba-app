'use server'

import { v4 as uuidv4 } from 'uuid';
import { addTransaction, getTransactions } from '@/lib/store';
import { Transaction } from '@/types/transaction';
import { calculateIncome } from '@/lib/calculateIncome';

export async function addTransactionAction(formData: FormData) {
  const transaction: Transaction = {
    id: uuidv4(),
    date: formData.get('date') as string,
    bookmaker: formData.get('bookmaker') as string,
    amount: parseFloat(formData.get('amount') as string),
  };

  addTransaction(transaction);
  const updatedTransactions = getTransactions();
  const { monthlyIncome, overallIncome } = calculateIncome(updatedTransactions);

  return { transactions: updatedTransactions, monthlyIncome, overallIncome };
}


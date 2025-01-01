import type { Transaction } from "@/types/transaction";
import { mockTransactions } from "./mockData";

const transactions: Transaction[] = [...mockTransactions];

export function getTransactions() {
	return transactions;
}

export function addTransaction(transaction: Transaction) {
	transactions.push(transaction);
}

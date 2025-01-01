import type { Transaction } from "@/types/transaction";
import { v4 as uuidv4 } from "uuid";

const bookmakers = [
	"Bet365",
	"William Hill",
	"Paddy Power",
	"Ladbrokes",
	"Betfair",
];

function randomDate(start: Date, end: Date) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime()),
	);
}

function randomBookmaker() {
	return bookmakers[Math.floor(Math.random() * bookmakers.length)];
}

function randomAmount(min: number, max: number) {
	return Number.parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

export function generateMockTransactions(count: number): Transaction[] {
	const startDate = new Date("2024-01-01");
	const endDate = new Date("2024-12-31");

	return Array.from({ length: count }, () => ({
		id: uuidv4(),
		date: randomDate(startDate, endDate).toISOString().split("T")[0],
		bookmaker: randomBookmaker(),
		amount: randomAmount(-1000, 1000), // Allow negative amounts for losses
	}));
}

export const mockTransactions = generateMockTransactions(100);

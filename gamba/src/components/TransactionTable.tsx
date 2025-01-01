"use client";

import { useState } from "react";
import type { Transaction } from "@/types/transaction";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExtendedTransaction extends Transaction {
	totalIncomeBefore: number;
	monthlyIncomeBefore: number;
}

export default function TransactionTable({
	transactions,
}: { transactions: Transaction[] }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const extendedTransactions: ExtendedTransaction[] = transactions.map(
		(transaction, index) => {
			const totalIncomeBefore = transactions
				.slice(0, index)
				.reduce((sum, t) => sum + t.amount, 0);
			const monthlyIncomeBefore = transactions
				.filter((t) => t.date.startsWith(transaction.date.substring(0, 7)))
				.slice(
					0,
					transactions.findIndex((t) => t.id === transaction.id),
				)
				.reduce((sum, t) => sum + t.amount, 0);
			return { ...transaction, totalIncomeBefore, monthlyIncomeBefore };
		},
	);

	const totalPages = Math.ceil(extendedTransactions.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentTransactions = extendedTransactions.slice(startIndex, endIndex);

	const goToLastPage = () => setCurrentPage(totalPages);

	return (
		<Card className="h-full flex flex-col">
			<CardHeader>
				<CardTitle>Transaction Log</CardTitle>
			</CardHeader>
			<CardContent className="flex-grow flex flex-col">
				<div className="flex justify-between items-center mb-4">
					<Select
						value={itemsPerPage.toString()}
						onValueChange={(value) => {
							setItemsPerPage(Number(value));
							setCurrentPage(1);
						}}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select page size" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="5">5 per page</SelectItem>
							<SelectItem value="10">10 per page</SelectItem>
							<SelectItem value="20">20 per page</SelectItem>
							<SelectItem value="50">50 per page</SelectItem>
						</SelectContent>
					</Select>
					<Button onClick={goToLastPage}>Go to Last Page</Button>
				</div>
				<div className="flex-grow overflow-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Date</TableHead>
								<TableHead>Bookmaker</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead>Total Income</TableHead>
								<TableHead>Monthly Income</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{currentTransactions.map((transaction) => (
								<TableRow key={transaction.id}>
									<TableCell>{transaction.date}</TableCell>
									<TableCell>{transaction.bookmaker}</TableCell>
									<TableCell
										className={
											transaction.amount >= 0
												? "text-green-600"
												: "text-red-600"
										}
									>
										{transaction.amount.toFixed(2)}
									</TableCell>
									<TableCell>
										{transaction.totalIncomeBefore.toFixed(2)}
									</TableCell>
									<TableCell>
										{transaction.monthlyIncomeBefore.toFixed(2)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<div className="flex justify-between items-center mt-4">
					<Button
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
					>
						Previous
					</Button>
					<span>
						Page {currentPage} of {totalPages}
					</span>
					<Button
						onClick={() =>
							setCurrentPage((prev) => Math.min(prev + 1, totalPages))
						}
						disabled={currentPage === totalPages}
					>
						Next
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

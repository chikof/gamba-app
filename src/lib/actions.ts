'use server';

import { v4 as uuidv4 } from 'uuid';
import { addTransaction, getTransactions } from '@/lib/store';
import type { Transaction } from '@/types/transaction';
import { calculateIncome } from '@/lib/calculateIncome';
import { ApiRoutes } from '@/lib/api';
import type { AuthorizeResponse, LoginResponse } from '@/types/api/auth';
import { isNullOrUndefined } from '@/lib/utils';

export async function addTransactionAction(formData: FormData) {
	const transaction: Transaction = {
		id: uuidv4(),
		date: formData.get('date') as string,
		bookmaker: formData.get('bookmaker') as string,
		amount: Number.parseFloat(formData.get('amount') as string)
	};

	addTransaction(transaction);
	const updatedTransactions = getTransactions();
	const { monthlyIncome, overallIncome } =
		calculateIncome(updatedTransactions);

	return { transactions: updatedTransactions, monthlyIncome, overallIncome };
}

export async function getAuthenticationURI(): Promise<LoginResponse> {
	const response = await fetch(ApiRoutes.Auth.Login);
	return response.json();
}

export async function authorizeUser(
	code: string,
	state: string
): Promise<AuthorizeResponse & { gamba_session: string }> {
	const response = await fetch(
		`${ApiRoutes.Auth.Authorize}?code=${code}&state=${state}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	const gamba_session = response.headers.get('Set-Cookie');

	if (isNullOrUndefined(gamba_session)) {
		throw new Error('Failed to authorize user');
	}

	const responseData = await response.json();

	return { ...responseData, gamba_session };
}

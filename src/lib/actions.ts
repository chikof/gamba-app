import { v4 as uuidv4 } from 'uuid';
import { addTransaction, getTransactions } from '@/lib/store';
import type { Transaction } from '@/types/transaction';
import { calculateIncome } from '@/lib/calculateIncome';
import { ApiRoutes } from '@/lib/api';
import type { AuthorizeResponse, LoginResponse } from '@/types/api/auth';
import { UserModel } from '@/types/api/user';

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

export async function getLoginLink() {
	const response = await fetch(ApiRoutes.Auth.Login, {
		credentials: 'include'
	});

	const cookie = response.headers.get('Set-Cookie');
	const data = (await response.json()) as LoginResponse;

	return {
		url: data.redirect_url,
		cookie: cookie || ''
	};
}

export async function getUserProfile() {
	const response = await fetch(ApiRoutes.User.Me, {
		credentials: 'include'
	});
	return (await response.json()) as UserModel;
}

export async function authorizeUser(
	code: string,
	state: string,
	session_cookie: string
) {
	const response = await fetch(
		`${ApiRoutes.Auth.Authorize}?code=${code}&state=${state}`,
		{
			headers: {
				Cookie: `gamba_session=${session_cookie}`
			}
		}
	);

	const cookie = response.headers.get('Set-Cookie');
	const data = (await response.json()) as AuthorizeResponse;

	return {
		...data,
		gamba_session: cookie?.split('=')[1].split(';')[0] || ''
	};
}

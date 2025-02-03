import { getLoginLink } from '@/lib/actions';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const { url, cookie } = await getLoginLink();
		const response = NextResponse.redirect(url);

		// Forward the Set-Cookie header directly from backend
		response.headers.append('Set-Cookie', cookie);

		return response;
	} catch (error) {
		return new Response('Authentication failed', { status: 500 });
	}
}

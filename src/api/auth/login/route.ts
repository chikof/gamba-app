import { getAuthenticationURI } from '@/lib/actions';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { url, state } = await getAuthenticationURI();

	// Set the state cookie
	(await cookies()).set('auth_csrf_state', state, {
		maxAge: 60 * 60
	});

	return NextResponse.redirect(url);
}

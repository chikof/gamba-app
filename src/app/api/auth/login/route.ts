import { getAuthenticationURI } from '@/lib/actions';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
	const { url, state } = await getAuthenticationURI();
	const cookieStore = await cookies();

	// Set the state cookie
	cookieStore.set('auth_csrf_state', state, {
		maxAge: 60 * 60
	});

	return NextResponse.redirect(url);
}

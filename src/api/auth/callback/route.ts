import { authorizeUser } from '@/lib/actions';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const code = req.nextUrl.searchParams.get('code');
	const state = req.nextUrl.searchParams.get('state');

	if (!code || !state) {
		return NextResponse.redirect('/');
	}

	const csrfState = (await cookies()).get('auth_csrf_state');

	if (csrfState?.value !== state) {
		return NextResponse.redirect('/');
	}

	const auth = await authorizeUser(code, state);

	if (!auth.gamba_session) {
		return NextResponse.redirect('/');
	}

	(await cookies()).set('gamba_session', auth.gamba_session, {
		// 90 days
		maxAge: 60 * 60 * 24 * 90
	});

	NextResponse.redirect('/');
}

// import { cookies } from 'next/headers';
import { authorizeUser } from '@/lib/actions';
import { NextRequest, NextResponse } from 'next/server';

const url = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const code = searchParams.get('code');
		const state = searchParams.get('state');

		if (!code || !state) {
			return NextResponse.redirect(`${url}?error=missing_parameters`);
		}

		const session_cookie = req.cookies.get('gamba_session')?.value || '';

		// const cookieStore = await cookies();
		// const cookie = cookieStore.get('gamba_session')?.value || '';

		const auth = await authorizeUser(code, state, session_cookie);
		const response = NextResponse.redirect(url);

		// Set cookie using headers directly to preserve all attributes
		response.headers.append(
			'Set-Cookie',
			`gamba_session=${auth.gamba_session}; Path=/; ${
				process.env.NODE_ENV === 'production'
					? 'Secure; SameSite=None'
					: ''
			} HttpOnly; Max-Age=${60 * 60 * 24 * 90}`
		);

		return response;
	} catch (error) {
		console.error('Authentication error:', error);
		return NextResponse.redirect(`${url}?error=auth_failed`);
	}
}

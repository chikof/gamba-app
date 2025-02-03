import { NextRequest, NextResponse } from 'next/server';
// import { getUserProfile } from '@/lib/actions';
import { ApiRoutes } from '@/lib/api';

export async function GET(req: NextRequest) {
	try {
		const cookie = req.cookies.get('gamba_session')?.value!;
		const user = await fetch(ApiRoutes.User.Me, {
			headers: {
				Cookie: 'gamba_session=' + cookie
			}
		});
		const res = await user.json();

		return NextResponse.json(res);
	} catch (error) {
		return NextResponse.json(null, { status: 401 });
	}
}

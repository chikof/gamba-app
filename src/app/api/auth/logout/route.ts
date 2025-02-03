import { NextResponse } from 'next/server';

export async function POST() {
	const response = NextResponse.json({ success: true });
	// Clear cookie with proper security settings
	response.cookies.set({
		name: 'gamba_session',
		value: '',
		expires: new Date(0),
		path: '/'
	});
	return response;
}

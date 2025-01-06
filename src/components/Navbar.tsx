'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/actions';
import { getClientCookie } from '@/lib/utils';

export default function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState('');

	useEffect(() => {
		console.log('useEffect');
		const sessionToken = getClientCookie('gamba_session');
		if (!sessionToken) return;

		verifySession(sessionToken).then((me) => {
			if (me.username) {
				setIsLoggedIn(true);
				setUsername(me.username);
			}
		});
	}, []);

	const handleLogout = () => {
		setIsLoggedIn(false);
		setUsername('');
	};

	return (
		<nav className="bg-primary text-primary-foreground">
			<div className="container mx-auto px-4 py-2 flex justify-between items-center">
				<Link href="/" className="text-lg font-bold">
					Gamba
				</Link>
				<div>
					{isLoggedIn ? (
						<div className="flex items-center space-x-4">
							<span>Welcome, {username}</span>
							<Button onClick={handleLogout} variant="secondary">
								Logout
							</Button>
						</div>
					) : (
						<LoginButton />
					)}
				</div>
			</div>
		</nav>
	);
}

export function LoginButton() {
	return (
		<Button
			variant="secondary"
			onClick={async () => {
				redirect('/api/auth/login');
			}}
		>
			Login
		</Button>
	);
}

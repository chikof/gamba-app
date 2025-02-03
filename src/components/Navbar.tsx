'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserModel } from '@/types/api/user';

export default function Navbar() {
	const [user, setUser] = useState<UserModel | null>(null);

	const checkAuth = async () => {
		try {
			// Use API route instead of direct server action
			const response = await fetch('/api/auth/me', {
				credentials: 'include'
			});

			if (!response.ok) throw new Error('Unauthorized');
			const userData = await response.json();
			setUser(userData);
		} catch (error) {
			setUser(null);
			console.error('Failed to get user profile:', error);
		}
	};

	const handleLogout = async () => {
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			setUser(null);
			window.location.reload();
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<nav className="bg-primary text-primary-foreground">
			<div className="container mx-auto px-4 py-2 flex justify-between items-center">
				<Link href="/" className="text-lg font-bold">
					Gamba
				</Link>
				<div>
					{user ? (
						<div className="flex items-center space-x-4">
							<span>Welcome, {user.username}</span>
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
	const handleLogin = () => {
		window.location.href = '/api/auth/login';
	};

	return (
		<Button variant="secondary" onClick={handleLogin}>
			Login
		</Button>
	);
}

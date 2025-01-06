import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isNull<T>(v: T | null): v is null {
	return v === null;
}

export function isUndefined<T>(v: T | undefined): v is undefined {
	return v === undefined;
}

export function isNullOrUndefined<T>(
	v: T | null | undefined
): v is null | undefined {
	return isNull(v) || isUndefined(v);
}

export function getClientCookie(name: string) {
	if (typeof document === 'undefined') return;

	const value = '; ' + document.cookie;
	const decodedValue = decodeURIComponent(value);
	const parts = decodedValue.split('; ' + name + '=');

	if (parts.length === 2) {
		return parts.pop()?.split(';').shift();
	}
}

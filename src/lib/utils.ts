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

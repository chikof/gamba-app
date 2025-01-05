import type { UserModel } from '@/types/api/user';

export type LoginResponse = {
	url: string;
	state: string;
};

export type AuthorizeResponse = UserModel;

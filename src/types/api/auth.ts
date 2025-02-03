import type { UserModel } from '@/types/api/user';

export type LoginResponse = {
	redirect_url: string;
};

export type AuthorizeResponse = UserModel;

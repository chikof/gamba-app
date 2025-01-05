const apiUrl = process.env.API_URL;

export const ApiRoutes = {
	Auth: {
		/**
		 * `GET` - Get the login link
		 */
		Login: `${apiUrl}/private/session/login`,

		/**
		 * `POST` - Authorize the user
		 */
		Authorize: `${apiUrl}/private/session/authorize`,

		/**
		 * `DELETE` - Logout the user
		 */
		Logout: `${apiUrl}/private/session`
	},
	Bet: {
		/**
		 * `POST` - Place a bet
		 */
		Place: `${apiUrl}/bet/place`
	},
	User: {
		/**
		 * `GET` - Get the user's profile
		 */
		Me: `${apiUrl}/me`,

		/**
		 * `GET` - Get the bets of the user
		 */
		Bets: `${apiUrl}/me/bets`
	},
	Misc: {
		/**
		 * `DELETE` - Logout the user
		 */
		metadata: `${apiUrl}/`
	}
} as const;

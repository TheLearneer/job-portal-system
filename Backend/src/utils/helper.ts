import * as jwt from 'jsonwebtoken';
import { parse } from 'url';
import { Request, Context } from 'koa';

const unprotectedRoutes: Array<Route | string | RegExp> = [
	'/',
	'/auth/signup',
	'/auth/login',
	// Routes with certain methods unprotected
	{ path: '/jobs', methods: ['GET'] },
	{ path: /^\/jobs\/(.)*/, methods: ['GET'] }
]

/* --------------------------------------------------------------------- */
/* --------------------------- HELPER METHODS -------------------------- */
/* --------------------------------------------------------------------- */

export const decodeUserInfo = (request: Request): AuthUser | false => {
	const token: string = request.headers['authorization'].split('Bearer ')[1];
	try {
		const decoded: AuthUser = <AuthUser>jwt.verify(token, <string>process.env.SECRET_KEY);
		return {
			id: decoded.id,
			access: decoded.access
		};
	} catch (err) {
		return false;
	}
}

export const protectRoutesJWT = (ctx: Context): boolean => {
	const url = parse(ctx.request.originalUrl);
	return unprotectedRoutes.some((route) => isUrlMatch(route, <string>url.pathname) && isMethodMatch(route, ctx.request.method));
}

/* --------------------------------------------------------------------- */
/* ----------------------------- INTERFACES ---------------------------- */
/* --------------------------------------------------------------------- */

export interface AuthUser {
	id: number,
	access: number
};

/* --------------------------------------------------------------------- */
/* -------------------------- INTERNAL STUFFS -------------------------- */
/* --------------------------------------------------------------------- */

const isUrlMatch = (route: string | any, url: string): boolean => {
	if (typeof route === 'string' && route === url) return true;
	else if (route instanceof RegExp && route.exec(url)) return true;
	else if (route.path) return isUrlMatch(route.path, url);
	else return false;
}

const isMethodMatch = (route: Route | any, m: string): boolean => {
	if (!route.methods) return true;
	return route.methods.indexOf(m) > -1;
}

interface Route {
	path: string | RegExp,
	methods: string[]
}

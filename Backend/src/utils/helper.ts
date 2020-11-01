import * as jwt from 'jsonwebtoken';
import { Request } from 'koa';

export interface AuthUser {
	id: number,
	access: number
};

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

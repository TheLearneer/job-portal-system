import * as jwt from 'jsonwebtoken';
import { Request } from 'koa';

interface User {
	id: string,
	access: number
};

export const decodeUser = (request: Request): User | false => {
	const token: string = request.headers['authorization'].split('Bearer ')[1];
	try {
		const decoded: User = jwt.verify(token, <string>process.env.SECRET_KEY) as User;
		return {
			id: decoded.id,
			access: decoded.access
		};
	} catch (err) {
		return false;
	}
}

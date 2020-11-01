import Router from 'koa-router';
import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken';

import { decodeUserInfo, AuthUser } from '../utils/helper';

import { User } from '../entities/User';
import { Authentication } from '../entities/Authentication';

const router = new Router({ prefix: '/auth' });

router.post('/signup', async (ctx) => {
	const info = ctx.request.body;
	if (!info) return ctx.throw(400, 'Invalid Request!');

	const auth = new Authentication();
	auth.email = info.email;
	auth.password = info.password;
	auth.access = info.access;

	const user = new User();
	user.email = info.email;
	user.name = info.name;
	user.authentication = auth;

	const UserRepository = getManager().getRepository(User);
	await UserRepository.save(user);

	ctx.status = 200;
	ctx.body = { success: true };
});

router.post('/login', async (ctx) => {
	const { email, password } = ctx.request.body;
	if (!email || !password) return ctx.throw(400, 'Invalid Request');

	const AuthRepository = getManager().getRepository(Authentication);
	const userAuth = <Authentication>await AuthRepository.findOne({ email, password });
	if (!userAuth) return ctx.throw(400, 'Invalid Credentials!');

	const accessToken = jwt.sign({ id: userAuth.email, access: userAuth.access }, <string>process.env.JWT_SECRET, { expiresIn: '1d' });

	ctx.status = 200;
	ctx.body = { token: { accessToken } };
});

router.get('/logout', (ctx) => {
	ctx.status = 200;
	ctx.body = { token: null };
});

router.get('/user', async (ctx) => {
	const decodedUser = <AuthUser>decodeUserInfo(ctx.request);
	const UserRepository = getManager().getRepository(User);
	const user = await UserRepository.findOne({ id: decodedUser.id });

	ctx.status = 200;
	ctx.body = user;
})

export default router;

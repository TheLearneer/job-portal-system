import Router from 'koa-router';
import { getManager, getRepository } from 'typeorm';

import { User } from '../entities/User';
import { Authentication } from '../entities/Authentication';

const router = new Router({ prefix: '/auth' });

router.get('/signup', async (ctx) => {
	const auth = new Authentication();
	auth.email = 'contact@santoshb.com.np';
	auth.password = 'password';

	const user = new User();
	user.email = 'contact@santoshb.com.np';
	user.name = 'Santosh Bhandari';
	user.authentication = auth;

	const UserRepository = getManager().getRepository(User);
	await UserRepository.save(user);

	ctx.status = 200;
	ctx.body = { success: true };
});

router.post('/login', async (ctx) => {
	ctx.body = {
		success: true
	};
});

router.get('/logout', (ctx) => {
	ctx.body = {
		success: true
	};
});

router.get('/user', async (ctx) => {
	ctx.body = {
		success: true
	};
})

export default router;

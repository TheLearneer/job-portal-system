import Router from 'koa-router';
import { getManager } from 'typeorm';

import { User } from '../entities/User';
import { Company } from '../entities/Company';

import { decodeUserInfo, AuthUser } from '../utils/helper';

const router = new Router({ prefix: '/admin' });

router.patch('/verify/user/:id', async (ctx) => {
	const decodedUser = <AuthUser>decodeUserInfo(ctx.request);
	if (decodedUser.id !== 0) return ctx.throw(403, 'Not permitted!');
	const { id } = ctx.params.id;

	const UserRepository = getManager().getRepository(User);
	const user = await UserRepository.findOne(id);
	if (!user) return ctx.throw(404, 'Invalid User!');

	user.verified = true;
	await UserRepository.save(user);

	ctx.status = 200;
	ctx.body = { success: true };
});

router.patch('/verify/company/:id', async (ctx) => {
	const decodedUser = <AuthUser>decodeUserInfo(ctx.request);
	if (decodedUser.id !== 0) return ctx.throw(403, 'Not permitted!');
	const { id } = ctx.params.id;

	const CompanyRepository = getManager().getRepository(Company);
	const company = await CompanyRepository.findOne(id);
	if (!company) return ctx.throw(404, 'Invalid User!');

	company.verified = true;
	await CompanyRepository.save(company);

	ctx.status = 200;
	ctx.body = { success: true };
});

export default router;

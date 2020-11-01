import Router from 'koa-router';

const router = new Router({ prefix: '/jobs' });

router.get('/', async (ctx) => {
	ctx.body = {
		success: true
	};
});

router.get('/:id', async (ctx) => {
	ctx.body = {
		success: true
	};
});

router.post('/', async (ctx) => {
	ctx.body = {
		success: true
	};
});

export default router;

import Router from 'koa-router';

const router = new Router();

router.get('/', (ctx) => {
	ctx.body = {
		version: '1.0.0',
		author: "Santosh Bhandari <contact@santoshb.com.np>",
		license: "MIT"
	};
});

export default router;

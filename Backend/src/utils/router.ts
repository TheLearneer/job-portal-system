import Router from 'koa-router';

const apiRouter = new Router();

import baseRouter from '../routes/index';
import jobsRouter from '../routes/jobs';
import authRouter from '../routes/auth';

const routes = [baseRouter, jobsRouter, authRouter];

for (let route of routes) {
	apiRouter
		.use(route.routes())
		.use(route.allowedMethods());
}

export default apiRouter;

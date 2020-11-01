import { config as envConfig } from 'dotenv';
envConfig();

import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import morgan from 'koa-morgan';
import jwt from 'koa-jwt';
import { createConnection } from 'typeorm';

import apiRouter from './utils/router';

const SECRETKEY: string = <string>process.env.JWT_SECRET;
const PORT: number | string = process.env.PORT || 3030;

createConnection()
	.then(() => {
		const app = new Koa();

		app
			.use(morgan('common'))
			.use(bodyParser())
			.use(
				jwt({ secret: SECRETKEY })
					.unless({
						path: [
							'/',
							'/auth/signup',
							'/auth/login',
							'/jobs',
							/^\/jobs\/(.)*/
						]
					})
			)
			.use(apiRouter.routes())
			.use(apiRouter.allowedMethods());

		app.listen(PORT, () => {
			console.log(`Backend for Job portal System is ready at port: ${PORT}`);
		})
	})
	.catch((err) => {
		console.log("TypeORM connection Error: ", err);
	})



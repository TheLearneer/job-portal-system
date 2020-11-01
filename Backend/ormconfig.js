module.exports = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: true,
	logging: false,
	entities: ['dist/src/entities/**/*.js']
}
module.exports = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: true,
	logging: false,
	entities: ['src/entities/**/*.{ts,js}']
}
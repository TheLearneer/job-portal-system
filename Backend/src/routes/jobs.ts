import Router from 'koa-router';
import { getManager } from 'typeorm';

import { Job } from '../entities/Job';
import { Company } from '../entities/Company';

const router = new Router({ prefix: '/jobs' });

router.get('/', async (ctx) => {
	const JobRepository = getManager().getRepository(Job);
	const jobList = await JobRepository.find({
		select: ['id', 'title', 'nature', 'vacancySex', 'salary', 'salaryRange', 'dueDate', 'location', 'hot', 'featured'],
		relations: ['company']
	})

	ctx.status = 200;
	ctx.body = { jobs: jobList };
});

router.get('/:id', async (ctx) => {
	const { id } = ctx.params.id;

	const JobRepository = getManager().getRepository(Job);
	const job = await JobRepository.findOne({ where: { id }, relations: ['company'] });
	if (!job) return ctx.throw(404, 'Invalid job ID');

	ctx.status = 200;
	ctx.body = job;
});

router.post('/', async (ctx) => {
	const { info } = ctx.params;
	if (!info) return ctx.throw(400, 'Invalid Request');

	const job = new Job();
	job.title = info.title;
	job.nature = info.nature;
	job.vacancy = info.vacancy;
	job.vacancySex = info.vacancySex;
	job.salary = info.salary;
	job.salaryRange = info.salaryRange;
	job.location = info.location;
	job.description = info.description;
	job.publishDate = info.publishDate;
	job.dueDate = info.dueDate;
	job.skills = info.skills;
	job.experience = info.experience;
	job.responsibilities = info.responsibilities;
	job.benefits = info.benefits;

	const CompanyRepository = getManager().getRepository(Company);
	const company = <Company>await CompanyRepository.findOne(info.companyId);

	job.company = company;

	ctx.status = 200;
	ctx.body = { success: true };
});

export default router;

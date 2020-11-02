import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Company } from './Company';

@Entity()
export class Job {

	@PrimaryGeneratedColumn()
	public id!: number;

	@Column('varchar', { length: 128 })
	public title!: string;

	@Column('int')
	public nature!: number;

	@Column('int')
	public vacancy!: number;

	@Column('int')
	public vacancySex!: number;

	@Column('int')
	public salary!: number | null;

	@Column('int', { array: true })
	public salaryRange!: number[] | null;

	@Column('boolean')
	public hot = false;

	@Column('boolean')
	public featured = false;

	@Column('varchar', { length: 128 })
	public location!: string;

	@Column('varchar', { length: 1024 })
	public description!: string;

	@Column('date')
	public publishDate!: Date;

	@Column('date')
	public dueDate!: Date;

	@Column('varchar', { length: 512, array: true })
	public skills!: string[];

	@Column('varchar', { length: 512, array: true })
	public experience!: string[];

	@Column('varchar', { length: 512, array: true })
	public responsibilities!: string[];

	@Column('varchar', { length: 512, array: true })
	public benefits!: string[];

	@ManyToOne(() => Company, company => company.jobs)
	public company!: Company;
}

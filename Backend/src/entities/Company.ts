import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Job } from './Job';

@Entity()
export class Company {

	@PrimaryGeneratedColumn('increment')
	public id!: number;

	@Column('varchar', { length: 100 })
	public name!: string;

	@Column('varchar', { length: 128 })
	public location!: string;

	@Column('boolean')
	public verified = false;

	@Column('varchar', { length: 100 })
	public website!: string;

	@Column('varchar', { length: 100 })
	public contactMail!: string;

	@Column('varchar', { length: 16 })
	public contactNumber!: string;

	@Column('varchar', { length: 128 })
	public logo!: string;

	@Column('varchar', { length: 128 })
	public descriptionShort!: string;

	@Column('varchar', { length: 1024 })
	public descriptionLong!: string;

	@OneToMany(() => Job, job => job.company)
	public jobs!: Job[]
}
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import { Authentication } from './Authentication';

@Entity()
export class User {

	@PrimaryGeneratedColumn('increment')
	public id!: number;

	@Column('varchar', { length: 64 })
	public email!: string;

	@Column('varchar', { length: 64 })
	public name!: string;

	@OneToOne(() => Authentication, auth => auth.user, {
		cascade: true
	})
	public authentication!: Authentication;
}

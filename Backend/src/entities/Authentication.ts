import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Authentication {

	@PrimaryColumn('varchar', { length: 64 })
	public email!: string;

	@Column('varchar', { length: 32 })
	public password!: string;

	@Column('integer')
	public access: number = 1;
	// 0: Site admin
	// 1: Job Seeker
	// 2: Job publisher

	@OneToOne(() => User, user => user.authentication)
	@JoinColumn()
	public user!: User;
}

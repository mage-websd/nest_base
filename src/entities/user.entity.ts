import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { CreatedAt, UpdatedAt } from '../utils/customColumns';
import { AbaseExtends } from './abase-extend';
import { Child } from './child.entity';
import { Timeline } from './timeline.entity';
import { InjectionBook } from './injectionbook.entity';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User extends AbaseExtends {

  static filled = [
    'name',
    'phone',
    'email',
    'address',
    'gender',
    'birth',
    'favorite',
    'refCode',
    'refFrom',
    'status',
    'username',
    'password'
  ];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  gender: number;

  @Column()
  birth: Date;

  @Column()
  favorite: string;

  @Column()
  refCode: string;

  @Column()
  refFrom: string;

  @Column()
  username: string;

  @Column({
    select: false
  })
  password: string;

  @Column()
  status: number;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;

  @OneToMany(() => Child, childs => childs.user)
  childs: Child[];

  @OneToMany(() => Timeline, timeline => timeline.user)
  timelines: Timeline[];

  @OneToMany(() => InjectionBook, ib => ib.user)
  injectionBooks: InjectionBook[];
}

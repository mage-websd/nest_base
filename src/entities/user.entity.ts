import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedAt, UpdatedAt } from '../utils/customColumns';
import { AbaseExtends } from './abase-extend';

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

  @Column()
  password: string;

  @Column()
  status: number;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;
}

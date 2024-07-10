import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Actor from './base';
import { UserPhone } from './user-phone.entity';

@Entity('users')
export class User extends Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'mail', nullable: false, unique: true })
  mail: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @OneToMany(() => UserPhone, (c) => c.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  userPhones: UserPhone[];
}

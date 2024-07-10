import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Actor from './base';
import { User } from './user.entity';

@Entity('user_phones')
export class UserPhone extends Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'phone', nullable: false, unique: true })
  phone: string;

  @ManyToOne(() => User, (c) => c.userPhones)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}

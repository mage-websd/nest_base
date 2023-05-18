import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedAt, UpdatedAt } from '../utils/customColumns';
import { AbaseExtends } from './abase-extend';

@Entity('notification')
export class Notification extends AbaseExtends {

  static filled = ['title', 'desc', 'image', 'device', 'status'];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  image: string;

  @Column()
  device: string;

  @Column()
  status: number;

  @Column()
  date: Date

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;
}

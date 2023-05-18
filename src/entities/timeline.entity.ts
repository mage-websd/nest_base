import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedAt, UpdatedAt } from '../utils/customColumns';
import { AbaseExtends } from './abase-extend';

@Entity('timeline')
export class Timeline extends AbaseExtends {

  static filled = ['title', 'desc', 'date', 'image', 'userId', 'status'];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string

  @Column()
  desc: string

  @Column()
  date: Date;

  @Column()
  image: string;

  @Column()
  userId: number;

  @Column()
  status: number;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;
}

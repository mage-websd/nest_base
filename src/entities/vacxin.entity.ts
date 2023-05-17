import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedAt, UpdatedAt } from '../utils/customColumns';
import { AbaseExtends } from './abase-extend';

@Entity('vacxin')
export class Vacxin extends AbaseExtends {

  static filled = ['name', 'status'];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: number;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;
}

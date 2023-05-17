import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedAt, UpdatedAt } from '../utils/customColumns';
import { AbaseExtends } from './abase-extend';

@Entity('config')
export class Config extends AbaseExtends {

  static filled = ['key', 'value'];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;
}

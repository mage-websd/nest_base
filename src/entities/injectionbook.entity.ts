import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedAt, UpdatedAt } from '../utils/customColumns';
import { AbaseExtends } from './abase-extend';

@Entity('injectionbook')
export class InjectionBook extends AbaseExtends {

  static filled = ['vacId', 'vacDate', 'address', 'userId', 'childId', 'note'];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vacId: number

  @Column()
  vacDate: Date

  @Column()
  address: string;

  @Column()
  userId: number;

  @Column()
  childId: number;

  @Column()
  note: string;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;
}

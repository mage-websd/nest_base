import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CreatedAt, UpdatedAt } from '../utils/customColumns';
import { AbaseExtends } from './abase-extend';
import { InjectionBook } from './injectionbook.entity';

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

  @OneToMany(() => InjectionBook, ib => ib.vacxin)
  injectionBooks: InjectionBook[];
}

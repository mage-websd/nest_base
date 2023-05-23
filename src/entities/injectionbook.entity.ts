import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { CreatedAt, UpdatedAt } from '../utils/customColumns';
import { AbaseExtends } from './abase-extend';
import { User } from './user.entity';
import { Child } from './child.entity';
import { Vacxin } from './vacxin.entity';

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

  @OneToOne(() => User, user => user.id)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id'
  })
  user: User;

  @OneToOne(() => Child, child => child.id)
  @JoinColumn({
    name: 'childId',
    referencedColumnName: 'id'
  })
  child: Child;

  @OneToOne(() => Vacxin, vacxin => vacxin.id)
  @JoinColumn({
    name: 'vacId',
    referencedColumnName: 'id'
  })
  vacxin: Vacxin;
}

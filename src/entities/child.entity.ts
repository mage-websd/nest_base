import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { CreatedAt, UpdatedAt } from '../utils/customColumns';
import { AbaseExtends } from './abase-extend';
import { User } from './user.entity';
import { InjectionBook } from './injectionbook.entity';

@Entity('child')
export class Child extends AbaseExtends {

  static filled = ['name', 'userId', 'nick', 'gender', 'birth', 'duebirth', 'placebirth', 'favorite', 'status'];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column()
  nick: string;

  @Column()
  gender: number;

  @Column()
  birth: Date;

  @Column()
  duebirth: Date;

  @Column()
  placebirth: string;

  @Column()
  favorite: string;

  @Column()
  status: number;

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

  @OneToMany(() => InjectionBook, ib => ib.child)
  injectionBooks: InjectionBook[];
}

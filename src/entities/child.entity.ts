import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedAt, UpdatedAt } from '../utils/customColumns';
import { AbaseExtends } from './abase-extend';

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
}

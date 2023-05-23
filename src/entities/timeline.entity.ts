import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { CreatedAt, UpdatedAt } from '../utils/customColumns';
import { AbaseExtends } from './abase-extend';
import { User } from './user.entity';

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

  @OneToOne(() => User, user => user.id)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id'
  })
  user: User;
}

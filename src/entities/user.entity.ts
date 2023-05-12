import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedAt, UpdatedAt} from '../utils/customColumns';

@Entity('user')
export class User {

  static filled = ['name', 'phone', 'status'];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  status: number;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;
}

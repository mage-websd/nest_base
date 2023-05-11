import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedAt, UpdatedAt} from '../utils/customColumns';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;
}

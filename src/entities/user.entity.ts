import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedAt, UpdatedAt } from '../utils/customColumns';
import { Expose } from 'class-transformer';
import * as moment from 'moment';

@Entity('user')
export class User {

  static filled = ['name', 'phone', 'email', 'address', 'gender', 'birth', 'favorite', 'refCode', 'refFrom', 'status'];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  gender: number;

  @Column()
  birth: Date;

  @Column()
  favorite: string;

  @Column()
  refCode: string;

  @Column()
  refFrom: string;

  @Column()
  status: number;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;

  @Expose()
  get birthday(): string {
    if (!this.birth) {
      return '';
    }
    return moment(this.birth).format('yyyy-MM-DD');
  }

}

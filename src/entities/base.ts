import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

export class BaseEntity {
  public setAtts(attrs: any) {
    for (const attr in attrs) {
      this[attr] = attrs[attr];
    }
    return this;
  }
}

export default class Actor extends BaseEntity {
  @Column({ name: 'created_user_id', nullable: true })
  createdUserId: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'updated_user_id', nullable: true })
  updatedUserId: number;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'deleted_user_id', nullable: true })
  deletedUserId: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    precision: 0,
  })
  deletedAt: Date;

  @BeforeInsert()
  setCreatedDates() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}

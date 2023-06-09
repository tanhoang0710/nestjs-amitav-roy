import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoles } from './user.enum';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @ApiProperty({
    description: 'id',
    example: 0,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.MEMBER,
  })
  role: UserRoles;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}

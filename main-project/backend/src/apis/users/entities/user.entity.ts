import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ nullable: true })
  @Field(() => String)
  nickname: string;

  @Column({ nullable: true })
  @Field(() => String)
  gender: string;

  @Column({ nullable: true })
  @Field(() => String)
  birthday: string;

  @Column({ nullable: true })
  @Field(() => String)
  mobile: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  profileImageUrl: string;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;
}

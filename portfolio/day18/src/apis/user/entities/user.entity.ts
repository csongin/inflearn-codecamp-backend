import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
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
  loginId: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ unique: true })
  @Field(() => String)
  nickname: string;

  @Column()
  @Field(() => String)
  birthday: string;

  @Column()
  @Field(() => String)
  phonenumber: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  profileImageUrl: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  location: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  views: number;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt: Date;

  @JoinColumn()
  @ManyToOne(() => User, { nullable: true })
  @Field(() => User, { nullable: true })
  user: User;
}

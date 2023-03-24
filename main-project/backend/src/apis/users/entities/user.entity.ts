import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
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

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  snsId: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  snsType: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  snsProfile: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  @ManyToMany(() => Product, (products) => products.users)
  products: Product[];
}

import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  imageUrl: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isMain: boolean;

  @JoinColumn()
  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;
}

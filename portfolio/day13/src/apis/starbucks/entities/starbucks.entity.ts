import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Starbucks {
  @Column()
  @Field(() => String)
  menu: string;

  @Column()
  @Field(() => Number)
  price: number;

  @Column()
  @Field(() => Number)
  kcal: number;

  @Column()
  @Field(() => Number)
  saturated_fat: number;

  @Column()
  @Field(() => Number)
  protein: number;

  @Column()
  @Field(() => Number)
  salt: number;

  @Column()
  @Field(() => Number)
  sugar: number;

  @Column()
  @Field(() => Number)
  caffeine: number;
}

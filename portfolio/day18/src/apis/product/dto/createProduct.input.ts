import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => String)
  location: string;

  @Field(() => Int, { nullable: true })
  views: number;

  @Field(() => String)
  description: string;

  @Field(() => Boolean, { nullable: true })
  isSoldout: boolean;
}

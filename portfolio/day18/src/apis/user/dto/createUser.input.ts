import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  login_id: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  nickname: string;

  @Field(() => String)
  birthday: string;

  @Field(() => String)
  phonenumber: string;

  @Field(() => String, { nullable: true })
  profile_image_url: string;
}

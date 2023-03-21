import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.pram';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser(@CurrentUser() currentUser: any) {
    console.log('fetchUser');
    console.log(currentUser);
    return 'fetchUser';
  }

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('nickname') nickname: string,
    @Args('birthday') birthday: string,
    @Args('phonenumber') phonenumber: string,
    @Args('profileImageUrl') profileImageUrl: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({
      email,
      hashedPassword,
      name,
      nickname,
      birthday,
      phonenumber,
      profileImageUrl,
    });
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('email') email: string, @Args('password') password: string) {
    return this.userService.delete({ email, password });
  }
}

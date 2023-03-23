import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/commons/auth/gql-user.pram';
import { GqlAuthAccessGuard } from '../auth/gql-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchLoginUser(@CurrentUser() currentUser: any) {
    console.log({ userInfo: currentUser });
    return 'login success';
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

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async updateUserPwd(
    @CurrentUser() currentUser: any,
    @Args('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.updatePwd({
      email: currentUser.email,
      password: hashedPassword,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteLoginUser(@CurrentUser() currentUser: any) {
    return this.userService.delete({
      email: currentUser.email,
    });
  }
}

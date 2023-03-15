import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  fetchUsers() {
    return this.userService.findAll();
  }

  @Query(() => User)
  fetchUser(@Args('email') email: string, @Args('password') password: string) {
    return this.userService.findOne({ email, password });
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create({ createUserInput });
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('email') email: string, @Args('password') password: string) {
    return this.userService.delete({ email, password });
  }
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface ICurrentUser {
  id?: string;
  email: string;
  name?: string;
  password?: string;
  nickname?: string;
  birthday?: string;
  phonenumber?: string;
  profileImageUrl?: string;
  point?: number;
}
export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

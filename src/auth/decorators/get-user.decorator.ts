import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from 'src/users/entities/user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserDocument => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

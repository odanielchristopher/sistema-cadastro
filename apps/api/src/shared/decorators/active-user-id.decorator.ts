import {
  createParamDecorator,
  type ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { HttpRequest } from '@shared/@types/http-request';

export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request: HttpRequest = context.switchToHttp().getRequest();

    if (!request.userId) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    return request.userId;
  },
);

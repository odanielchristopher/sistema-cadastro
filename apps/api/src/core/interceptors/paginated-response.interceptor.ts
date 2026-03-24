import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  PaginatedResponse,
  UncheckedPaginatedResponseMeta,
} from '@shared/@types/paginated-response.type';
import { PAGINATED_RESPONSE_KEY } from '@shared/decorators/is-paginated.decorator';

@Injectable()
export class PaginatedResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const paginatedResponseEnabled = this.reflector.getAllAndOverride<boolean>(
      PAGINATED_RESPONSE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!paginatedResponseEnabled) {
      return next.handle();
    }

    return next.handle().pipe(
      map(
        (
          result: PaginatedResponse<any, UncheckedPaginatedResponseMeta>,
        ): PaginatedResponse<any> => {
          const { data, meta } = result;

          const page = Number(meta.page) || 1;
          const perPage = Number(meta.perPage) || 12;

          return {
            data,
            meta: {
              page,
              perPage,
              totalItems: meta.total,
              totalPages: Math.ceil(meta.total / perPage),
            },
          };
        },
      ),
    );
  }
}

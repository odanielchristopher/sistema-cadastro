import { SetMetadata } from '@nestjs/common';

export const PAGINATED_RESPONSE_KEY = 'eteg:paginated-response';
export const IsPaginated = () => SetMetadata(PAGINATED_RESPONSE_KEY, true);

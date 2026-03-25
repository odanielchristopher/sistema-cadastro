import type { FetchNextPageFn } from './FetchNextPageFn';
import { type IPaginatedResponse } from './IPaginatedResponse';

export type InfiniteQueryResponse<TResponse> = {
  nextPage: FetchNextPageFn<IPaginatedResponse<TResponse>>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

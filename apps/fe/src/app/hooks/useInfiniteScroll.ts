import { type QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { type IPaginatedResponse } from '@app/types/IPaginatedResponse';

type UseInfiniteScrollParams<TResponse> = {
  queryKey: QueryKey;
  infiniteLoader: (params: {
    page: number;
    perPage: number;
  }) => Promise<IPaginatedResponse<TResponse>>;
  perPage: number;
  enabled?: boolean;
};

export function useInfiniteScroll<TResponse>({
  queryKey,
  perPage,
  enabled,
  infiniteLoader,
}: UseInfiniteScrollParams<TResponse>) {
  return useInfiniteQuery({
    queryKey,
    staleTime: Infinity,
    initialPageParam: 1,
    enabled,
    queryFn: ({ pageParam }) => infiniteLoader({ page: pageParam, perPage }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;

      if (page >= totalPages) {
        return undefined;
      }

      return page + 1;
    },
  });
}

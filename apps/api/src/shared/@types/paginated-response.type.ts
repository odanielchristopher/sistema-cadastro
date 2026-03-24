export type UncheckedPaginatedResponseMeta = {
  page: number;
  perPage: number;
  total: number;
};

export type PaginatedResponseMeta = Omit<
  UncheckedPaginatedResponseMeta,
  'total'
> & {
  totalItems: number;
  totalPages: number;
};

export type PaginatedResponse<TData, TMeta = PaginatedResponseMeta> = {
  data: TData[];
  meta: TMeta;
};

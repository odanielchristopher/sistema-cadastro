export interface IPaginatedResponseMeta {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IPaginatedResponse<TData> {
  data: TData[];
  meta: IPaginatedResponseMeta;
}

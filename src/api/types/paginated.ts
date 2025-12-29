export default interface Paginated<T> extends Pagination {
  elements: T[];
}

export interface Pagination extends PaginationData {
  totalElements: number;

  page: number;

  totalPages: number;

  hasPrevPage: boolean;

  hasNextPage: boolean;

  prevPage: number | null;

  nextPage: number | null;
}

export interface PaginationData {
  limit: number;

  offset: number;
}

interface IGenericPagination {
  count: number;
  page_size: number;
  page_count: number;
  next: string;
  previous: string;
  hasNext: boolean;
  hasPrevious: boolean;
}

export default IGenericPagination;

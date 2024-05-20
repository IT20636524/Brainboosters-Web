interface IFilterSortParams {
  ordering?: string;
  search?: string;
  page?: number;
  page_size?: number;
  page_count?: number;
  include?: string;
}

export default IFilterSortParams;

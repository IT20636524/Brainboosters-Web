import IGenericPagination from "@interfaces/general/IGenericPagination";

interface IGenericResponse<T> {
  status: string;
  status_code: number;
  type: string;
  params: [];
  data: T;
  meta?: IGenericPagination;
}

export default IGenericResponse;

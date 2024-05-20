import axios, { AxiosResponse } from "axios";
import IFilterSortParams from "@interfaces/general/IFilterSortParams";
import IGenericResponse from "@interfaces/general/IGenericResponse";

abstract class GenericService<T> {
  baseURL: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  abstract endPointURL: string;

  async create(body: T): Promise<AxiosResponse<IGenericResponse<T>>> {
    try {
      return axios.post(this.urlPathConstructor(), body);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updatePatch(
    id?: string,
    body?: T,
  ): Promise<AxiosResponse<IGenericResponse<T>>> {
    try {
      if (id) return axios.patch(`${this.urlPathConstructor([id])}/`, body);

      return axios.patch(this.urlPathConstructor(), body);
    } catch (error: any) {
      console.error(`${error}`);
      throw new Error(error);
    }
  }

  async update(
    id: string,
    body: T,
  ): Promise<AxiosResponse<IGenericResponse<T>>> {
    try {
      return axios.put(`${this.urlPathConstructor([id])}/`, body);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<AxiosResponse<IGenericResponse<T>>> {
    try {
      return axios.delete(`${this.urlPathConstructor([id])}/`);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async fetch(
    id: string,
    filterSortObject?: IFilterSortParams,
    additionalParams?: { key: string; value: string }[],
    query?: string[],
  ): Promise<AxiosResponse<IGenericResponse<T>>> {
    try {
      return await axios.get(
        [
          this.urlPathConstructor([id]),
          GenericService.urlParamConstructor(
            filterSortObject,
            additionalParams,
            query,
          ),
        ].join(""),
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async fetchAll(
    filterSortObject?: IFilterSortParams,
    additionalParams?: { key: string; value: string }[],
    query?: string[],
  ): Promise<AxiosResponse<IGenericResponse<T[]>>> {
    try {
      return axios.get(
        [
          this.urlPathConstructor(),
          GenericService.urlParamConstructor(
            filterSortObject,
            additionalParams,
            query,
          ),
        ].join(""),
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  protected urlPathConstructor(paths?: string[]): string {
    return [this.baseURL, this.endPointURL, ...(paths ?? [])].join("/");
  }

  protected static urlParamConstructor(
    filterSortObject?: IFilterSortParams,
    additionalParams?: { key: string; value: string }[],
    query?: string[],
  ): string {
    let keyList: string[] = [];
    if (filterSortObject)
      keyList = Object.entries(filterSortObject)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`);

    if (additionalParams) {
      keyList.push(
        ...additionalParams.map((element) => `${element.key}=${element.value}`),
      );
    }

    if (query) keyList.push(`query={${query}}`);

    return filterSortObject ? `?${keyList.join("&")}` : "";
  }
}

export default GenericService;

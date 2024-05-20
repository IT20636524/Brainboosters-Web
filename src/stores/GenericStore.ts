import { AxiosResponse } from "axios";
import { action, makeObservable, observable } from "mobx";
import NotificationType from "@enums/NotificationType";
import IFilterSortParams from "@interfaces/general/IFilterSortParams";
import IGenericPagination from "@interfaces/general/IGenericPagination";
import IGenericResponse from "@interfaces/general/IGenericResponse";
import GenericService from "@services/GenericService";
import { notificationStore } from "./StoreInitializer";

abstract class GenericStore<T> {
  dataItem: T | null = null;
  dataList: T[] = [];

  meta: IGenericPagination | null | undefined = null;

  protected abstract service: GenericService<T>;

  constructor(isDeep?: boolean) {
    makeObservable(this, {
      dataItem: observable,
      meta: observable,
      create: action,
      update: action,
      delete: action,
      fetch: action,
      fetchAll: action,
      emptyDataList: action,
      setDataItem: action,
      setDataList: action,
      setMeta: action,
    });

    if (isDeep) {
      makeObservable(this, {
        dataList: observable.deep,
      });
    } else {
      makeObservable(this, {
        dataList: observable,
      });
    }
  }

  emptyDataList() {
    this.setDataList([]);
  }

  async create(body: T) {
    try {
      const response = await this.service.create(body);
      return {
        data: response.data,
        status: response.data.status,
        status_code: response.data.status_code,
      };
    } catch (error: any) {
      notificationStore.displayNotification(NotificationType.Danger, error);
    }
  }

  async update(id: string, body: T) {
    try {
      await this.service.update(id, body);
    } catch (error: any) {
      notificationStore.displayNotification(NotificationType.Danger, error);
    }
  }

  async delete(id: string) {
    try {
      await this.service.delete(id);
    } catch (error: any) {
      notificationStore.displayNotification(NotificationType.Danger, error);
    }
  }

  async fetch(
    id: string,
    filterSortObject?: IFilterSortParams,
    additionalParams?: { key: string; value: string }[],
    query?: string[],
  ) {
    try {
      const res: AxiosResponse<IGenericResponse<T>> = await this.service.fetch(
        id,
        filterSortObject,
        additionalParams,
        query,
      );

      this.setMeta(res.data.meta);
      this.setDataItem(res.data.data);
    } catch (error: any) {
      notificationStore.displayNotification(NotificationType.Danger, error);
    }
  }

  async fetchAll(
    filterSortObject?: IFilterSortParams,
    additionalParams?: { key: string; value: string }[],
    query?: string[],
  ) {
    try {
      const res: AxiosResponse<IGenericResponse<T[]>> =
        await this.service.fetchAll(filterSortObject, additionalParams, query);

      this.setMeta(res.data.meta);
      this.setDataList(res.data.data);
    } catch (error: any) {
      notificationStore.displayNotification(NotificationType.Danger, error);
    }
  }

  setDataItem(data: T) {
    this.dataItem = data;
  }

  setDataList(data: T[]) {
    this.dataList = data;
  }

  setMeta(data?: IGenericPagination) {
    this.meta = data;
  }
}

export default GenericStore;

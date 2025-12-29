import Paginated from "../../types/paginated";
import IRepository from "../repository.interface";
import { HttpService } from "./http/axios/axios-http-service";

import { AbortClass } from "../../classes/AbortClass";
import { config } from "../../config";
import { RequestData } from "../../http/Http";

export default class ApiRepository implements IRepository {
  protected readonly apiUrl: string;

  protected readonly resource: string;

  protected endpoint: string;

  constructor(resource: string) {
    this.apiUrl = config.apiUrl;
    this.resource = resource;
    this.endpoint = `${this.apiUrl}/${this.resource}`;
  }

  /**
   *
   * @param element Element to create <T>
   * @returns Created element as <U>
   */
  public async create<T, U>(element: T): Promise<U> {
    const data: RequestData = {
      endpoint: this.endpoint,
      body: element,
    };

    return HttpService.postAsync(data);
  }

  /**
   *
   * @returns Array of <T>
   */
  public async getAll<T>(params?: any, abort?: AbortClass): Promise<T[]> {
    const data: RequestData = { endpoint: this.endpoint, params, abort };

    return HttpService.getAsync(data);
  }

  /**
   *
   * @param limit Amount of elements desired per page <T[]>
   * @param offset Starting index for requested elements
   * @param params Desired query params (usually filters)
   * @returns Paginated elements
   */
  public async getAllPaginated<T>(
    limit: number,
    offset: number,
    params?: any,
    abort?: AbortClass
  ): Promise<Paginated<T>> {
    const data: RequestData = {
      endpoint: `${this.endpoint}`,
      params: { limit, offset, ...params },
      abort,
    };

    return HttpService.getAsync(data);
  }

  /**
   *
   * @param id Id of desired element
   * @returns Element <T>
   */
  public async getById<T>(
    id: string,
    filters?: any,
    abort?: AbortClass
  ): Promise<T> {
    const data: RequestData = {
      endpoint: `${this.endpoint}/${id}`,
      params: filters,
      abort,
    };

    return HttpService.getAsync(data);
  }

  /**
   *
   * @param id Id of desired element to update
   * @param element Element to update with updated attributes <T>
   * @returns void
   */
  public async update<T>(id: string, element: T): Promise<void> {
    const data: RequestData = {
      endpoint: `${this.endpoint}/${id}`,
      body: element,
    };

    await HttpService.putAsync(data);
  }

  /**
   *
   * @param id Id of desired element to delete
   * @returns Void
   */
  public delete(id: string): Promise<void> {
    const data: RequestData = { endpoint: `${this.endpoint}/${id}` };

    return HttpService.deleteAsync(data);
  }
}

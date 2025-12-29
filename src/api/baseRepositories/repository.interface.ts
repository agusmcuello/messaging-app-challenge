import { AbortClass } from "../classes/AbortClass";
import Paginated from "../types/paginated";

/**
 * @description Base respository interface implemented by each general repository
 */

export default interface IRepository {
  getAll<T>(filters?: any, abort?: AbortClass): Promise<T[]>;

  getAllPaginated<T>(
    limit: number,
    offset: number,
    filters?: any,
    abort?: AbortClass
  ): Promise<Paginated<T>>;

  getById<T>(id: string, filters?: any, abort?: AbortClass): Promise<T>;

  create<T, U>(element: T): Promise<U>;

  update<T>(id: string, element: T): Promise<void>;

  delete(id: string): Promise<void>;
}

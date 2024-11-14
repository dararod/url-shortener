import type { Mongoose } from 'mongoose';
import type { Id } from "../Id";

export type Database = Mongoose;

export interface IRepository<T> {
  create(data: Partial<T>): Promise<Id>;
  delete(id: Id): Promise<void>;
  find(query: Partial<T>): Promise<T | null>;
  findById(id: Id): Promise<T | null>;
  list(query: Partial<T>): Promise<T[]>;
  update(id: Id, data: Partial<T>): Promise<void>;
}

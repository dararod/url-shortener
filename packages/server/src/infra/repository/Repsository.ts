import type { Id } from "../Id";
import type { Database, IRepository } from "./IRepository";

export class Repository<T> implements IRepository<T> {
    public readonly collectionName: string;

    protected db: Database;

    constructor(dbConn: Database, collectionName: string) {
      this.db = dbConn;
      this.collectionName = collectionName;
    }

    async create(data: Partial<T>): Promise<Id> {
      const coll = this.db.connection.collection(this.collectionName);
      const res = await coll.insertOne(data);
      return res.insertedId;
    }

    async delete(id: Id): Promise<void> {
      const coll = this.db.connection.collection(this.collectionName);
      await coll.deleteOne(id);
    }

    async find(query: Partial<T>): Promise<T | null> {
        throw new Error("Method not implemented.");
    }

    async findById(id: Id): Promise<T | null> {
      const coll = this.db.connection.collection(this.collectionName);
      return await coll.findOne(id) as T;
    }

    async list(query: Partial<T>): Promise<T[]> {
        throw new Error("Method not implemented.");
    }

    async update(id: Id, data: Partial<T>): Promise<void> {
      const coll = this.db.connection.collection(this.collectionName);
      await coll.updateOne({ id }, { $set: data });
    }
}

import { connect } from 'mongoose';

import type { Database } from './IRepository';

export { Repository } from "./Repsository";

export type { Database, IRepository } from "./IRepository";

export async function makeDatabaseConn(databaseURL: string): Promise<Database> {
  return connect(databaseURL);
}

export async function migrate(db: Database): Promise<void> {
  const usersCollection = db.connection.collection('users');
  await usersCollection.createIndex({ email: 1 }, { unique: true });

  const links = db.connection.collection('links');
  await links.createIndex({ slug: 1 }, { unique: true });
}

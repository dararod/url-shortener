import { connect } from 'mongoose';

import type { Database } from './IRepository';

export { Repository } from "./Repsository";

export type { Database, IRepository } from "./IRepository";

export async function makeDatabaseConn(databaseURL: string): Promise<Database> {
  return connect(databaseURL);
}

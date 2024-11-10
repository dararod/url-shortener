import { connect } from 'mongoose';

import type { Mongoose } from 'mongoose';

export async function openMongoDBConn(): Promise<Mongoose> {
  return connect(process.env.DATABASE_URL as string);
}

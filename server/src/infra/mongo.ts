import { connect } from 'mongoose';

import type { Mongoose } from 'mongoose';

export async function openMongoDBConn(): Promise<Mongoose> {
  return connect('mongodb://localhost:27017/mern-url-shortener');
}

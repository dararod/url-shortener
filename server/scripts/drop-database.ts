import { openMongoDBConn } from '../src/infra/mongo'

async function dropDatabase() {
    const conn = await openMongoDBConn();

    try {
        await conn.connection.dropDatabase();
        process.exit(0);
    } catch (err) {
        console.error(err);
    }
}

dropDatabase();
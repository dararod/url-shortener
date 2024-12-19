import { makeDatabaseConn } from '../src/infra/repository'
import { DATABASE_URL } from '../tests/constants';

async function dropDatabase() {
    const conn = await makeDatabaseConn(DATABASE_URL);

    try {
        await conn.connection.dropDatabase();
        process.exit(0);
    } catch (err) {
        console.error(err);
    }
}

dropDatabase();
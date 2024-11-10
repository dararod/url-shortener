import { config } from 'dotenv';

import { Server } from './app/server';

async function main(): Promise<void> {
    config();

    const server = new Server();

    await server.run();
}

main();

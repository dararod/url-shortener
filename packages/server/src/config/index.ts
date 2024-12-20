const { DATABASE_URL, HOST, PORT } = process.env;

export default { 
    databaseUrl: DATABASE_URL,
    host: HOST || '127.0.0.1',
    port: parseInt(PORT as string, 10) || 3000,
}
import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 6543,
    username: 'postgres',
    password: 'admin',
    database: 'TEST_SM',
}

export default config;
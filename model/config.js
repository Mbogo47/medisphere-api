import assert from 'assert';
import dotenv from 'dotenv';

dotenv.config();

const { PORT, HOST_URL, HOST, SQL_USER, SQL_PWD, SQL_DB, SQL_SERVER, JWT_SECRET } = process.env;

// const sqlEncrypt = process.env.SQL_ENCRYPT === 'true';

assert(PORT, 'PORT IS REQUIRED');
// assert(HOST, "HOST IS REQUIRED");

const config = {
    port: PORT,
    // host: HOST,
    // url: HOST_URL,
    sql: {
        server: SQL_SERVER,
        database: SQL_DB,
        user: SQL_USER,
        password: SQL_PWD,
        options: {
            encrypt: true,
            trustServerCertificate: false
        }
    },
    jwt_secret: JWT_SECRET
}

export default config;
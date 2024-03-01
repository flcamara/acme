import "dotenv/config"
import knex from 'knex'

const dbConfig = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dateStrings: true
  },
  pool: {
    min: 2,
    max: 7
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

const db = knex(dbConfig)

export default db;
/**
 * Database configuration
 */
require('dotenv').config({
  path: `${__dirname}/../../../.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
});

import type { Knex } from 'knex';

const config: Knex.Config = {
  client: process.env.DATABASE_DRIVER || 'pg',
  connection: process.env.DATABASE_URL || {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'elearning_db',
  },
  searchPath: process.env.DATABASE_SCHEMA?.split(',') || ['public'],
  migrations: {
    directory: __dirname + '/../../database/migrations',
  },
  seeds: {
    directory: __dirname + '/../../database/seeders',
  },
  pool: {
    min: 2,
    max: 10,
    acquireTimeoutMillis: 30000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
  },
};

module.exports = config;

require('dotenv').load();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host:     process.env.PG_DEV_HOST,
      database: process.env.PG_DEV_DB,
      user:     process.env.PG_DEV_USER,
      password: process.env.PG_DEV_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './server/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './server/seeds'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      host:     process.env.PG_TEST_HOST,
      database: process.env.PG_TEST_DB,
      user:     process.env.PG_TEST_USER,
      password: process.env.PG_TEST_PASS
    },
    pool: {
      min: 1,
      max: 1
    },
    migrations: {
      directory: __dirname + '/server/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './server/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host:     process.env.PG_PROD_HOST,
      database: process.env.PG_PROD_DB,
      user:     process.env.PG_PROD_USER,
      password: process.env.PG_PROD_PASS,
      ssl:      process.env.PG_PROD_SSL, 
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/server/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './server/seeds'
    }
  }

};

// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host:     process.env.DEV_HOST,
      database: process.env.DEV_DB,
      user:     process.env.DEV_USER,
      password: process.env.DEV_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      host:     process.env.TEST_HOST,
      database: process.env.TEST_DB,
      user:     process.env.TEST_USER,
      password: process.env.TEST_PASS
    },
    pool: {
      min: 1,
      max: 1
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host:     process.env.PROD_HOST,
      database: process.env.PROD_DB,
      user:     process.env.PROD_USER,
      password: process.env.PROD_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

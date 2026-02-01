import path from "path";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite");

  const connections = {
    postgres: {
      connection: {
        connectionString: env("DATABASE_URL"),
        ssl: {
          rejectUnauthorized: false,
        },
      },
      pool: {
        min: 0,
        max: 5,
        acquireTimeoutMillis: 60000,
        idleTimeoutMillis: 60000,
      },
    },

    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db"),
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};

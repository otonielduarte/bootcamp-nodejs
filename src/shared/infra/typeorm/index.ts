import { createConnections } from 'typeorm';

createConnections([
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseFloat(process.env.POSTGRES_PORT || '5432'),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRESS_DATABASE,
    entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: process.env.MONGO_HOST,
    port: parseFloat(process.env.MONGO_PORT || '27017'),
    database: process.env.MONGO_DATABASE,
    useUnifiedTopology: true,
    entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
  },
]);

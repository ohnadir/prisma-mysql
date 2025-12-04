import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from "@prisma/client";
import config from "./index";

const adapter = new PrismaMariaDb({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name,
  port: config.database.port,
  connectionLimit: 10,
});

const Prisma = new PrismaClient({ adapter, log: ['error', 'warn'], });
export default Prisma;
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import PrismaClientPkg from "@prisma/client"; // default import for runtime
import config from "./index";
const { PrismaClient } = PrismaClientPkg;

const adapter = new PrismaMariaDb({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name,
  port: config.database.port,
  connectionLimit: 10,
});

const Prisma = new PrismaClient({ adapter, log: ['error', 'warn'] });
export default Prisma;
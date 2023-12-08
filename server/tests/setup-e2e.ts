import 'dotenv/config';
import { UnprocessableEntityException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

function generateUniqueDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new UnprocessableEntityException(
      JSON.stringify(
        {
          message: 'Please provider a DATABASE_URL environment variable',
          status: 422,
        },
        null,
        2,
      ),
    );
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schema);

  return url.toString();
}

const schema = randomUUID();
const prisma = new PrismaClient();

beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseUrl(schema);
  process.env.DATABASE_URL = databaseUrl;
  execSync('npm run migrate:deploy');
  execSync('npm run seed');
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  await prisma.$disconnect();
});

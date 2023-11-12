import { PrismaClient } from '../../../../../../prisma-mongo/client';

export function prismaMongoClientFactory() {
  return new PrismaClient();
}

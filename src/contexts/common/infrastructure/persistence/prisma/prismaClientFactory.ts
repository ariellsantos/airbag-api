import { PrismaClient } from '@prisma/client';

export function prismaClientFactory() {
  return new PrismaClient();
}

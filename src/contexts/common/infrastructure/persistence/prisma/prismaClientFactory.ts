import { PrismaClient } from '@prisma/client';

export function prismaClientFactory() {
  return new PrismaClient();
}

// const p = new PrismaClient()

// const res = p.vehicle.findUniqueOrThrow({where:{
// 		id: "id"
// 	}})

export interface Delegate {
  create(data: unknown): unknown;

  delete(data: unknown): unknown;

  findFirst(data: unknown): unknown;

  findMany(data: unknown): unknown;

  findUnique(data: unknown): unknown;

  update(data: unknown): unknown;

  findUniqueOrThrow(data: unknown): unknown;
}

export interface CrudTypeMap {
  create: unknown;
  delete: unknown;
  findFirst: unknown;
  findMany: unknown;
  findUnique: unknown;
  update: unknown;
  findUniqueOrThrow: unknown;
}

export abstract class PrismaOrmRepository<D extends Delegate, T extends CrudTypeMap, O, E> {
  protected constructor(protected delegate: D) {}

  public async create(data: T['create']) {
    await this.delegate.create(data);
  }

  public async findUniqueOrThrows(data: T['findUniqueOrThrow']): Promise<O> {
    return (await this.delegate.findUniqueOrThrow(data)) as O;
  }

  public async update(data: T['update']) {
    await this.delegate.update(data);
  }

  public async delete(id: string) {
    return await this.update({
      where: {
        id
      },
      data: {
        deleted: true
      }
    });
  }
}

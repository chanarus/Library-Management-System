import { Library } from '../models/library';
import { DatabaseProvider } from '../database';

export class LibraryService {
  public async getByID(id: number): Promise<Library> {
    const connection = await DatabaseProvider.getConnection();
    return await connection.getMongoRepository(Library).findOne(id);
  }

  public async list(): Promise<Library[]> {
    const connection = await DatabaseProvider.getConnection();
    return await connection.getMongoRepository(Library).find();
  }

  public async activeList(): Promise<Library[]> {
    const allLibs = await this.list();
    const activeLibs = allLibs.filter(lib => lib.active === true);
    return activeLibs;
  }

  public async create(library: Library): Promise<Library> {
    const connection = await DatabaseProvider.getConnection();
    return await connection.getMongoRepository(Library).save(library);
  }

  public async update(library: Library, id: number): Promise<Library> {
    const connection = await DatabaseProvider.getConnection();
    const repo = await connection.getMongoRepository(Library);
    const entity = await connection
      .getMongoRepository(Library)
      .findOneOrFail(id);
    entity.name = library.name;
    return await repo.save(entity);
  }

  public async delete(id: number): Promise<Library> {
    const connection = await DatabaseProvider.getConnection();
    const repo = await connection.getMongoRepository(Library);
    const entity = await connection
      .getMongoRepository(Library)
      .findOneOrFail(id);
    entity.active = false;
    return await repo.save(entity);
  }
}

export const libraryService = new LibraryService();

import { Library } from '../models/library';
import { DatabaseProvider } from '../database';

export class LibraryService {
  public async getByID(id: number): Promise<Library> {
    const connection = await DatabaseProvider.getConnection();
    return await connection.getMongoRepository(Library).findOneOrFail(id);
  }

  public async list(): Promise<Library[]> {
    const connection = await DatabaseProvider.getConnection();
    return await connection.getMongoRepository(Library).find();
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

  public async delete(id: number): Promise<void> {
    const connection = await DatabaseProvider.getConnection();
    return await connection.getMongoRepository(Library).remove();
  }
}

export const libraryService = new LibraryService();

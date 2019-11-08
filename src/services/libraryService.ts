import axios, { AxiosResponse } from 'axios';

import { Library } from '../models/library';
import { DatabaseProvider } from '../database';
import { Staff } from 'staff';

export class LibraryService {
  public async getByID(id: string): Promise<Library> {
    const connection = await DatabaseProvider.getConnection();
    return await connection.getMongoRepository(Library).findOne(id);
  }

  public async getStaff(id: string): Promise<Staff[]> {
    const staff: AxiosResponse = await axios.post(
      'https://prabashmadusankasl.000webhostapp.com/staffmgt/Staffmember/getStaffMemberByLib',
      {
        LibraryId: id
      }
    );
    return staff.data;
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

  public async update(library: Library, id: string): Promise<Library> {
    const connection = await DatabaseProvider.getConnection();
    const repo = await connection.getMongoRepository(Library);
    const entity = await connection
      .getMongoRepository(Library)
      .findOneOrFail(id);

    entity.name = library.name || entity.name;
    entity.active = library.active || entity.active;
    entity.location = library.location || entity.location;
    entity.address = library.address || entity.address;
    entity.contactNo = library.contactNo || entity.contactNo;

    return await repo.save(entity);
  }

  public async delete(id: string): Promise<Library> {
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

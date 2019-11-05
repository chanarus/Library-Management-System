import { Controller } from './controller';
import { HTTPServer } from '../server/httpServer';
import { libraryService } from '../services/libraryService';
import { Request, Response } from 'restify';

export class LibraryController implements Controller {
  public initialize(httpServer: HTTPServer): void {
    httpServer.get('library', this.list.bind(this));
    httpServer.get('library/:id', this.getByID.bind(this));
    httpServer.post('library', this.create.bind(this));
    httpServer.put('library/:id', this.update.bind(this));
    httpServer.del('library/:id', this.delete.bind(this));
  }

  private async list(req: Request, res: Response): Promise<void> {
    res.send(await libraryService.list());
  }

  private getByID(req: Request, res: Response): void {}

  private create(req: Request, res: Response): void {}

  private update(req: Request, res: Response): void {}

  private delete(req: Request, res: Response): void {}
}

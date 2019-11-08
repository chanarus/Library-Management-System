import { Controller } from './controller';
import { HTTPServer } from '../server/httpServer';
import { libraryService } from '../services/libraryService';
import { Request, Response } from 'restify';

export class LibraryController implements Controller {
  public initialize(httpServer: HTTPServer): void {
    httpServer.get('/library/:id', this.getByID.bind(this));
    httpServer.get('/library', this.list.bind(this));
    httpServer.get('/activelibrary', this.activeList.bind(this));
    httpServer.post('/library', this.create.bind(this));
    httpServer.put('/library/:id', this.update.bind(this));
    httpServer.del('/library/:id', this.delete.bind(this));
  }

  private async list(req: Request, res: Response): Promise<void> {
    res.send(await libraryService.list());
  }

  private async activeList(req: Request, res: Response): Promise<void> {
    res.send(await libraryService.activeList());
  }

  private async getByID(req: Request, res: Response): Promise<void> {
    const library = await libraryService.getByID(req.params.id);
    res.send(library ? 200 : 400, library);
  }

  private async create(req: Request, res: Response): Promise<void> {
    res.send(await libraryService.create(req.body));
  }

  private update(req: Request, res: Response): void {
    // TODO
  }

  private delete(req: Request, res: Response): void {
    // TODO
  }
}

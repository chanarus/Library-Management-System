import { HTTPServer } from './httpServer';
import { CONTROLLERS } from '../controllers';
import { RequestHandler, Server } from 'restify';
import corsMiddleware from 'restify-cors-middleware';
import * as restify from 'restify';

export class ApiServer implements HTTPServer {
  private restify: Server;

  public get(url: string, requestHandler: RequestHandler): void {
    this.addRoutes('get', url, requestHandler);
  }

  public post(url: string, requestHandler: RequestHandler): void {
    this.addRoutes('post', url, requestHandler);
  }

  public put(url: string, requestHandler: RequestHandler): void {
    this.addRoutes('put', url, requestHandler);
  }

  public del(url: string, requestHandler: RequestHandler): void {
    this.addRoutes('del', url, requestHandler);
  }

  private addRoutes(
    method: 'get' | 'post' | 'put' | 'del',
    url: string,
    requestHandler: RequestHandler
  ): void {
    this.restify[method](url, async (req, res, next) => {
      try {
        await requestHandler(req, res, next);
      } catch (error) {
        console.log('error', error);
        res.send(500, error);
      }
    });

    console.log(`Added routes ${method.toUpperCase()}: ${url}`);
  }

  public start(port: number): void {
    this.restify = restify.createServer();

    const cors = corsMiddleware({
      origins: ['*'],
      allowHeaders: ['*'],
      exposeHeaders: ['*']
    });

    this.restify.pre(cors.preflight);
    this.restify.use(cors.actual);

    this.restify.use(restify.plugins.bodyParser());
    this.restify.use(restify.plugins.queryParser());
    this.restify.use(restify.plugins.requestLogger());

    CONTROLLERS.forEach(controller => controller.initialize(this));

    this.restify.listen(port, () =>
      console.log(`Server is listen on port: ${port}`)
    );
  }
}

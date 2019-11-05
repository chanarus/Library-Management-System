import { HTTPServer } from '../server/httpServer';

export interface Controller {
  initialize(httpServer: HTTPServer): void;
}

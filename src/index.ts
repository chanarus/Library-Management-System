import 'reflect-metadata';
import { ApiServer } from './server';
import { DatabaseProvider } from './database';

DatabaseProvider.configure({
  type: (process.env.TYPE as any) || 'mongodb',
  useNewUrlParser: !!process.env.URL_PARSER || true,
  url:
    process.env.URL ||
    'mongodb+srv://chanaru:chanaru123@library-qw6rn.gcp.mongodb.net/library-db?retryWrites=true&w=majority',
  ssl: !!process.env.SSL || true,
  authSource: process.env.AUTH_SOURCE || 'admin',
  useUnifiedTopology: !!process.env.UNIFIED_TOPOLOGU || true
});

const server = new ApiServer();
server.start(+process.env.PORT || 8000);

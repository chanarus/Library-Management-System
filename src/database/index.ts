import { Connection, createConnection } from 'typeorm';
import { Library } from '../models/library';

export interface DatabaseConfiguration {
  type: 'mongodb';
  useNewUrlParser: boolean;
  url: string;
  ssl?: boolean;
  authSource: string;
  useUnifiedTopology: boolean;
}

export class DatabaseProvider {
  private static connection: Connection;
  private static configuration: DatabaseConfiguration;

  public static configure(config: DatabaseConfiguration): void {
    DatabaseProvider.configuration = config;
  }

  public static async getConnection(): Promise<Connection> {
    if (DatabaseProvider.connection) {
      return DatabaseProvider.connection;
    }

    const {
      type,
      useNewUrlParser,
      url,
      ssl,
      authSource,
      useUnifiedTopology
    } = DatabaseProvider.configuration;

    DatabaseProvider.connection = await createConnection({
      type,
      useNewUrlParser,
      url,
      authSource,
      useUnifiedTopology,
      extra: { ssl },
      entities: [Library],
      synchronize: true
    });

    return DatabaseProvider.connection;
  }
}

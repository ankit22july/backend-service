import { ApiError, InternalError, NotFoundError } from './core/ApiError';
import { Config, getConfig } from './config';
import { initializeMongoConnector } from './database';
import Logger from './core/Logger'; // initialize database
import express, { NextFunction, Request, Response } from 'express';
import routesV1 from './routes/v1';

export async function start(config: Config): Promise<any> {
  const app = express();

  app.use(express.json());

  app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong');
  });

  // Routes
  app.use('/v1', routesV1);

  // catch 404 and forward to error handler
  app.use((req, res, next) => next(new NotFoundError()));

  // Middleware Error Handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
      ApiError.handle(err, res);
    } else {
      if (config.env === 'development') {
        Logger.error(err);
        return res.status(500).send(err.message);
      }
      ApiError.handle(new InternalError(), res);
    }
  });

  await initializeMongoConnector(config);

  const port = config.port;
  const server = app.listen({ port: port });

  Logger.info(`🚀 REST API ready at http://localhost:${port}/api`);

  return server;
}

if (require.main === module) {
  start(getConfig()).catch(() => {
    process.exit(1);
  });
}

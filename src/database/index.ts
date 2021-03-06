import Logger from '../core/Logger';
import mongoose from 'mongoose';
import type { Config } from '../config';

export const initializeMongoConnector = async (config: Config) => {
  // Build the connection string
  const dbURI = `mongodb://${config.mongoConfig.user}:${encodeURIComponent(
    config.mongoConfig.password,
  )}@${config.mongoConfig.host}:${config.mongoConfig.port}/${config.mongoConfig.name}`;

  console.log('dbURI: ', dbURI);
  const options = {
    autoIndex: true,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  };

  Logger.debug(dbURI);

  // Create the database connection
  mongoose
    .connect(dbURI, options)
    .then(() => {
      Logger.info('Mongoose connection done');
    })
    .catch((e) => {
      Logger.info('Mongoose connection error');
      Logger.error(e);
    });

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', () => {
    Logger.info('Mongoose default connection open to ' + dbURI);
  });

  // If the connection throws an error
  mongoose.connection.on('error', (err) => {
    Logger.error('Mongoose default connection error: ' + err);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    Logger.info('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      Logger.info('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
};

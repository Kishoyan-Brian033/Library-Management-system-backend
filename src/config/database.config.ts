import { Pool } from 'pg';
import { Logger } from '@nestjs/common';

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
}

export const databaseConfig: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'hotel_management',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  ssl: process.env.NODE_ENV === 'production',
};

export const createDatabasePool = (): Pool => {
  try {
    const pool = new Pool({
      host: databaseConfig.host,
      port: databaseConfig.port,
      database: databaseConfig.database,
      user: databaseConfig.username,
      password: databaseConfig.password,
      ssl: databaseConfig.ssl ? { rejectUnauthorized: false } : false,
    });

    // Test the connection
    pool.query('SELECT NOW()', (err) => {
      if (err) {
        Logger.error('Database connection failed', err.stack);
      } else {
        Logger.log('Database connected successfully');
      }
    });

    return pool;
  } catch (error) {
    Logger.error('Failed to create database pool', error);
    throw new Error('Database connection failed');
  }
};

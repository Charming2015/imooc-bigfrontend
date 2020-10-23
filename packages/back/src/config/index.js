import path from 'path';
export * as DB from './db.config.json';
export * as JWT from './jwt.config.json';
export * as REDIS from './redis.config.json';
export * as MAIL from './mail.config.json';
export const PORT = 3000;
export const PUBLIC_DIR = path.join(__dirname, '..', '../public');

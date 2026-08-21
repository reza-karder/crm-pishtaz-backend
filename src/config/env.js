import dotenv from 'dotenv';

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/test',
  sessionSecret: process.env.SESSION_SECRET || "SOME SECRET FOR DEV",
  sessionMaxAgeMs: Number(process.env.SESSION_MAX_AGE_MS) || 1000 * 60 * 60 * 24 * 30,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
}

export default env
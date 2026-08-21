import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import routes from "./routes/index.js";
import env from "./config/env.js";

export default function createApp() {
  const app = express();

  app.use(helmet());
  app.use(express.json());
  app.use(cookieParser());

  app.use(
    session({
      secret: env.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: env.nodeEnv === "PRODUCTION",
        sameSite: 'lax',
        maxAge: env.sessionMaxAgeMs,
      },
    })
  );

  app.get('/health', (req, res) => {
    res.json({ success: true, message: "Server is running" });
  });

  app.use('/api', routes);

  return app;
}

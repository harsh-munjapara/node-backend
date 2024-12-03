import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './routers/user.router.js';

const app = express();

// middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// routers
app.use('/api/v1/users', userRouter);

export default app;
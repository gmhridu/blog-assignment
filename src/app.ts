import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
  }),
);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to PH Blogs');
});

// global error handler
app.use(globalErrorHandler);

// global not found handler
app.use(notFound);

export default app;

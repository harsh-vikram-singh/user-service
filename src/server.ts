import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(cookieParser());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('user service is running');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`User-service server is runningon port ${port}`);
})

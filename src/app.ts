import express, { Request, Response } from 'express'
import globalErrorHandler from './middlewares/globalErrorHandler';
import router from './routes';
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);


//global error handle
app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

export default app;
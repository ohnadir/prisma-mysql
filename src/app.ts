import express, { Request, Response } from 'express'
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
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
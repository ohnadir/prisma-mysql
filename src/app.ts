import express, { Request, Response } from 'express'
import globalErrorHandler from './middlewares/globalErrorHandler';
// import router from './routes';
import { Morgan } from './utils/morgan';
import { StatusCodes } from 'http-status-codes';
import compression from 'compression';
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Apply compression globally
app.use(compression());

// morgan
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);

//file retrieve
app.use(express.static('uploads'));

//router
// app.use('/api/v1', router);


//global error handle
app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
});

// handle not found route
app.use((req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API DOESN'T EXIST"
            }
        ]
    })
});

export default app;
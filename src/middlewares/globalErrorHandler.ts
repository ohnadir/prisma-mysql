import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IErrorMessage } from '../types/errors.types';
import { errorLogger } from '../utils/logger';
import handleZodError from './handleZodError';
import ApiError from '../utils/ApiError';
import handleValidationError from './handleValidationError';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    config.node_env === 'development'
    ? console.log('🚨 globalErrorHandler', error)
    : errorLogger.error('🚨 globalErrorHandler', error);

    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessages: IErrorMessage[] = [];

    if (error.name === 'ZodError') {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } 
    
    else if (error.name === 'PrismaClientValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    
    else if (error.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error.name === 'TokenExpiredError') {
        statusCode = StatusCodes.UNAUTHORIZED
        message = 'Session Expired'
        errorMessages = error?.message
            ? 
            [
                {
                    path: '',
                    message: 'Your session has expired. Please log in again to continue.',
                }
            ]
            : 
            []
    }
    else if (error.name === 'JsonWebTokenError') {
        statusCode = StatusCodes.UNAUTHORIZED
        message = 'Invalid Token'
        errorMessages = error?.message
            ? 
            [
                {
                    path: '',
                    message: 'Your token is invalid. Please log in again to continue.'
                }
            ]
            : []
    } 
    else if (error instanceof ApiError) {
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.message
            ? 
            [
                {
                    path: '',
                    message: error.message,
                }
            ]
            : 
            [];
    } else if (error instanceof Error) {
        message = error.message;
        errorMessages = error.message
            ? 
            [
                {
                    path: '',
                    message: error?.message,
                }
            ]
            : 
            [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.node_env !== 'production' ? error?.stack : undefined,
    });
}

export default globalErrorHandler;
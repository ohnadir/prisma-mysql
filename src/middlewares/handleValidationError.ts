import { IErrorMessage } from "../types/errors.types";
import PrismaClientPkg from "@prisma/client";
const { Prisma } = PrismaClientPkg;

const handleValidationError = (error: unknown) => {
    const errorMessages: IErrorMessage[] = [];

    // Known Prisma Request Error (e.g., invalid field, constraint, etc.)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        errorMessages.push({
            path: error.meta?.target?.toString() || "unknown",
            message: error.message,
        });
    }

    // Prisma Validation Error (invalid data type, missing field, etc.)
    else if (error instanceof Prisma.PrismaClientValidationError) {
        console.log("Nadir", error.message);
        
        // Parse the message to extract only specific "Argument `field` is missing." errors
        const parsedErrors = parsePrismaValidationError(error.message);
        errorMessages.push(...parsedErrors);
    }

    // Fallback for unknown Prisma or generic errors
    else if (error instanceof Error) {
        errorMessages.push({
            path: "unknown",
            message: error.message,
        });
    }

    const statusCode = 400;

    return {
        statusCode,
        message: "Validation Error",
        errorMessages,
    };
};

const parsePrismaValidationError = (message: string): IErrorMessage[] => {
    const errors: IErrorMessage[] = [];
    
    // Split the message by newlines to handle multiple errors
    const lines = message.split('\n').filter(line => line.trim());
    
    const missingArgumentRegex = /^Argument `([^`]+)` is missing\.$/;
    
    for (const line of lines) {
        const match = line.match(missingArgumentRegex);
        if (match) {
            const [, fieldName] = match;
            errors.push({
                path: fieldName,
                message: line.trim()
            });
        }
    }
    
    // If no matching errors were found, provide a fallback
    if (errors.length === 0) {
        errors.push({
            path: "validation",
            message: "No specific missing argument errors found in validation message.",
        });
    }
    
    return errors;
};

export default handleValidationError;
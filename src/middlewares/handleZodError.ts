import { ZodError } from "zod";
import { IErrorMessage } from "../types/errors.types";

const handleZodError = (error: ZodError) => {
    const errorMessages: IErrorMessage[] = error.issues.map((issue) => ({
        path: issue?.path?.join(",")?.split(",")[1] || "unknown",
        message: issue.message,
    }));

    return {
        statusCode: 400,
        message: "Validation Error",
        errorMessages,
    };
};

export default handleZodError;
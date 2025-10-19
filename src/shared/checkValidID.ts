import { z } from "zod";

export const checkValidID = (fieldName: string) =>
    z.string().refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        { message: `${fieldName} must be a valid numeric ID` }
    );

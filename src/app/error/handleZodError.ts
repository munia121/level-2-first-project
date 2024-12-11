import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";

const handleZodError = (err: ZodError) => {
    const errorDetails: TErrorSource = err.issues.map((issue: ZodIssue) => ({
      path: issue?.path[issue.path.length - 1] || "unknown",
      message: issue.message,
    }));

    return {
      statusCode: 400,
      message: "validation error",
      errorSource: errorDetails,
    };
  };

export default handleZodError
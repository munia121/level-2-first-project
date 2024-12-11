import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import config from "../config";
import { TErrorSource } from "../interface/error";
import handleZodError from "../error/handleZodError";
import handleValidationError from "../error/handleValidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";
import AppError from "../error/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";


  let errorSource: TErrorSource = [
    {
      path: "unknown",
      message: "Something went wrong!!",
    },
  ];

  // Function to handle Zod errors


  // Handle specific error types
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
    // console.log(simplifiedError)

  }
  else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    errorSource = simplifiedError?.errorSource
  }
  else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    errorSource = simplifiedError?.errorSource
  }
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }
  else if (err instanceof AppError){
    message = err.message;
    errorSource = [
      {
        path: '',
        message:err?.message,
      }
    ];
  }
  else if (err instanceof Error){
    message = err.message;
    errorSource = [
      {
        path:'',
        message:err?.message,

      }
    ]
  }


  
  // General error response
  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null
  });
};

export default globalErrorHandler;

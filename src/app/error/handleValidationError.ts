// import mongoose from "mongoose";
// import { TErrorSource } from "../interface/error";

// const handleValidationError = (err: mongoose.Error.ValidationError) => {

//     const errorSource: TErrorSource = Object.values(err.errors).map(
//         (val:mongoose.Error.ValidationError | mongoose.Error.CastError) =>{
//             return {
//                 path: val.path || '',
//                 message:val.message
//             }
//         }
//     )

//     const statusCode = 400;

//     return {
//         statusCode,
//         message: "validation Error",
//         errorSource,
//     };
// }

import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
    const errorSource: TErrorSource = Object.values(err.errors).map((val) => {
        return {
            path: val.path || "unknown", // Fallback to 'unknown' if path is undefined
            message: val.message || "Validation error occurred", // Fallback message
        };
    });

    const statusCode = 400;

    return {
        statusCode,
        message: "Validation Error",
        errorSource,
    };
};

export default handleValidationError;

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

// "http-status": "^1.8.1",
// "http-status": "^2.0.0",



const notFound = (req:Request, res:Response , next:NextFunction):any=>{
    return res.status(httpStatus.NOT_FOUND).json({
      success:false,
      message:'API not found',
      error: ''
    })
  }

export default notFound
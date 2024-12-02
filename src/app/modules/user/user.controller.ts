import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../ulits/sendResponse";
import httpStatus from "http-status";

const createStudent = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { password, student: studentData } = req.body;

    console.log('Password:', password);
    console.log('Student Data:', studentData); // Check the structure

    const result = await UserService.createStudentIntoDB( password,studentData);
    // res.status(200).json({
    //   success: true,
    //   message: "Student is create successfully",
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success:true,
      message: "Student is create successfully",
      data: result
    })

  } catch (err) {
    next(err)
  }
};



export const UserController = {
  createStudent
}
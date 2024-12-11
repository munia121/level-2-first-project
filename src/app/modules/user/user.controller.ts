import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../ulits/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../ulits/catchAsync";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student: studentData } = req.body;

    console.log('Password:', password);

    const result = await UserService.createStudentIntoDB(password, studentData);
    console.log('Student Data:', result); // Check the structure

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is create successfully",
      data: result
    })

  } catch (err) {
    next(err)
  }
};


const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});



export const UserController = {
  createStudent,
  createFaculty
}
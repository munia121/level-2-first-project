import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.serves";
import sendResponse from "../../ulits/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../ulits/catchAsync";





const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student are retrieved successfully",
    data: result
  })
});

const getSingleStudents = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is retrieved successfully",
    data: result
  })
});


const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted succesfully',
    data: result,
  });
});





export const StudentController = {
  getAllStudents,
  getSingleStudents,
  deleteStudent

};

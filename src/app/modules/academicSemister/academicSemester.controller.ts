import { NextFunction, Request, Response } from "express";
import sendResponse from "../../ulits/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../ulits/catchAsync";
import { AcademicSemesterService } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {

    const result = await AcademicSemesterService.createAcademicSemesterIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semester is create successfully",
        data: result
    })


});


const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.getAllAcademicSemestersFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semesters are retrieved successfully",
        data: result
    })
})


const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params
    const result = await AcademicSemesterService.getSingleAcademicSemesterFromDB(semesterId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semesters are retrieved successfully",
        data: result
    })

})


export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester
}
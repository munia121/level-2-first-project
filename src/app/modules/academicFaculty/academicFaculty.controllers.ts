import { NextFunction, Request, Response } from "express";
import sendResponse from "../../ulits/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../ulits/catchAsync";
import { AcademicFacultyService } from "./academicFaculty.service";


const createAcademicFaculty = catchAsync(async (req, res) => {

    const result = await AcademicFacultyService.createAcademicFacultyIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty is create successfully",
        data: result
    })


});


const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyService.getAllAcademicFacultiesFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty are retrieved successfully",
        data: result
    })
})


const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params
    const result = await AcademicFacultyService.getSingleAcademicFacultyFromDB(facultyId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty are retrieved successfully",
        data: result
    })

})

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyService.updateAcademicFacultyFromDB(facultyId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty are updated successfully",
        data: result
    })
})


export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty

}
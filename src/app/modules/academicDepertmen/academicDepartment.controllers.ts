import sendResponse from "../../ulits/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../ulits/catchAsync";
import { AcademicDepartmentService } from "./academicDepartment.service";


const createAcademicDepartment = catchAsync(async (req, res) => {

    const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(req.body)
    console.log('departent control', result)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department is create successfully",
        data: result
    })


});


const getAllAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentService.getAllAcademicDepartmentsFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department are retrieved successfully",
        data: result
    })
})


const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params
    const result = await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(departmentId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department are retrieved successfully",
        data: result
    })

})

const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentService.updateAcademicDepartmentFromDB(departmentId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department are updated successfully",
        data: result
    })
})


export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment

}
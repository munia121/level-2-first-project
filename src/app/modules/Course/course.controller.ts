import httpStatus from "http-status";
import catchAsync from "../../ulits/catchAsync";
import sendResponse from "../../ulits/sendResponse";
import { CourseServices } from "./course.service";




const createCourse = catchAsync(async (req, res) => {

    const result = await CourseServices.createCourseIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course is create successfully",
        data: result
    })


});


const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Courses are retrieved successfully",
        data: result
    })
})


const getSingleCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params
    const result = await CourseServices.geSingleCoursesFromDB(courseId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course are retrieved successfully",
        data: result
    })

})

const updateCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const result = await CourseServices.updateCourseIntoDB(courseId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course is updated successfully",
        data: result
    })
})



const deleteCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const result = await CourseServices.deleteCoursesIntoDB(courseId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is deleted successfully',
        data: result,
    });
});


const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body


    const result = await CourseServices.assignFacultiesWithCourseIntoDB(courseId, faculties);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties assigned successfully',
        data: result,
    });
});


export const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse,
    assignFacultiesWithCourse

}
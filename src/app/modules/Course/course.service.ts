import mongoose from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
import { CourseSearchableFields } from "./course.constant"
import { TCourse, TCourseFaculty } from "./course.interface"
import { Course, CourseFaculty } from "./course.model"
import AppError from "../../error/AppError"
import httpStatus from "http-status"

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload)
    return result
}


const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const coursesQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query)
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()
    const result = await coursesQuery.modelQuery
    return result
}


const geSingleCoursesFromDB = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course');
    return result
}


const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {

    const { preRequisiteCourses, ...courseRemainingData } = payload;

    const session = await mongoose.startSession()

    try {
        session.startTransaction()

        const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemainingData,
            {
                new: true,
                runValidators: true,
                session
            }
        )


        if (!updateBasicCourseInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
        }



        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // filter out the deleted fields
            const deletedPreRequisites = preRequisiteCourses
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);

            const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        preRequisiteCourses: { course: { $in: deletedPreRequisites } },
                    },
                },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            )

            if (!deletedPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
            }




            // filter out the new course filed
            const newPreRequisites = preRequisiteCourses?.filter(
                (el) => el.course && !el.isDeleted,
            )

            const newPreRequisitesCourses = await Course.findByIdAndUpdate(id,
                {
                    $addToSet: { preRequisiteCourses: { $each: newPreRequisites } }
                },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            )

            if (!newPreRequisitesCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
            }

        }


        await session.commitTransaction();
        await session.endSession();

        const result = await Course.findById(id).populate('preRequisiteCourses.course')

        return result





    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
    }


}





const deleteCoursesIntoDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result
}


const assignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {

    const result = await CourseFaculty.findByIdAndUpdate(id,
        { course: id, $addToSet: { faculties: { $each: payload } } },
        { upsert: true, new:true }
    );
    return result
}




export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    geSingleCoursesFromDB,
    deleteCoursesIntoDB,
    updateCourseIntoDB,
    assignFacultiesWithCourseIntoDB
}
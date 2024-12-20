import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRouters } from "../modules/academicSemister/academicSemester.route";
import { AcademicFacultyRouters } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRouters } from "../modules/academicDepertmen/academicDepartment.route";
import { CourseRouters } from "../modules/Course/course.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistretion/semesterRegistretion.route";
import { offeredCourseRoutes } from "../modules/offeredCourse/offeredCourse.route";


const router = Router()

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoute
    },
    {
        path: "/students",
        route: StudentRoutes
    },
    {
        path: "/academic-semesters",
        route: AcademicSemesterRouters
    },
    {
        path: "/academic-faculties",
        route: AcademicFacultyRouters
    },
    {
        path: "/academic-departments",
        route: AcademicDepartmentRouters
    },
    {
        path: "/courses",
        route: CourseRouters
    },
    {
        path: "/faculties",
        route: FacultyRoutes
    },
    {
        path: "/semester-registration",
        route: semesterRegistrationRoutes
    },
    {
        path: '/offered-courses',
        route: offeredCourseRoutes,
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))



export default router
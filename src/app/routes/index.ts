import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRouters } from "../modules/academicSemister/academicSemester.route";


const router = Router()

const moduleRoutes = [
    {
        path:"/users",
        route:UserRoute
    },
    {
        path:"/students",
        route:StudentRoutes
    },
    {
        path:"/academic-semesters",
        route:AcademicSemesterRouters
    },
]

moduleRoutes.forEach((route)=> router.use(route.path, route.route))



export default router
import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";


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
]

moduleRoutes.forEach((route)=> router.use(route.path, route.route))



export default router
import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { createStudentValidationSchema } from "../student/student.validation";
import validateRequest from "../../middlwares/validateRequest";
import { createFacultyValidationSchema } from "../Faculty/vaculty.validation";

const router = express.Router();





// will call controller  g
router.post("/create-student",
    validateRequest(createStudentValidationSchema),
    UserController.createStudent
);
router.post("/create-faculty",
    validateRequest(createFacultyValidationSchema),
    UserController.createFaculty
);


export const UserRoute = router;

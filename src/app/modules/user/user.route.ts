import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { AnyZodObject } from "zod";
import { createStudentValidationSchema } from "../student/student.validation";
import validateRequest from "../../middlwares/validateRequest";

const router = express.Router();





// will call controller  g
router.post("/create-student",
    validateRequest(createStudentValidationSchema),
    UserController.createStudent
);


export const UserRoute = router;

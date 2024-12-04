import express from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlwares/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";


const router = express.Router();

// will call controller  g

router.post('/create-academic-semester',
    validateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema),
    AcademicSemesterController.createAcademicSemester,

);

router.get("/", AcademicSemesterController.getAllAcademicSemesters);

router.get("/:semesterId", AcademicSemesterController.getSingleAcademicSemester);

// router.delete("/:studentId", StudentController.deleteStudent);

export const AcademicSemesterRouters = router;
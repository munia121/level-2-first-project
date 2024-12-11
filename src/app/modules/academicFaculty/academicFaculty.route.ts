import express from "express";
import validateRequest from "../../middlwares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyController } from "./academicFaculty.controllers";


const router = express.Router();

// will call controller  g

router.post('/create-academic-faculties',
    validateRequest(
        AcademicFacultyValidation.createAcademicFacultyValidationSchema
    ),
    AcademicFacultyController.createAcademicFaculty

);

router.get("/", AcademicFacultyController.getAllAcademicFaculty);

router.get("/:facultyId", AcademicFacultyController.getSingleAcademicFaculty);

router.patch("/:facultyId",
    validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema), AcademicFacultyController.updateAcademicFaculty);

export const AcademicFacultyRouters = router;
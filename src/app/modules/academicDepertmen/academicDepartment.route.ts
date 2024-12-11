import express from "express";
import validateRequest from "../../middlwares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentController } from "./academicDepartment.controllers";
const router = express.Router();

// will call controller  g

router.post('/create-academic-department',
    validateRequest(
        AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
    ),
    AcademicDepartmentController.createAcademicDepartment

);

router.get("/", AcademicDepartmentController.getAllAcademicDepartment);

router.get("/:departmentId", AcademicDepartmentController.getSingleAcademicDepartment);

router.patch("/:departmentId",
    validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), AcademicDepartmentController.updateAcademicDepartment);

export const AcademicDepartmentRouters = router;
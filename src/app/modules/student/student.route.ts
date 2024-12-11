import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middlwares/validateRequest";
import { updateStudentValidationSchema } from "./student.validation";

const router = express.Router();

// will call controller  g
router.get("/", StudentController.getAllStudents);
router.get("/:studentId", StudentController.getSingleStudents);
router.delete("/:studentId", StudentController.deleteStudent);
router.patch("/:studentId",validateRequest(updateStudentValidationSchema), StudentController.updateStudent);

export const StudentRoutes = router;

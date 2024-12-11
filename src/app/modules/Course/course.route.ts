import express from "express";
import validateRequest from "../../middlwares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseController } from "./course.controller";




const router = express.Router();

// will call controller  g

router.post('/create-course',
    validateRequest(
        CourseValidations.createCourseValidationSchema
    ),
    CourseController.createCourse

);

router.get("/", CourseController.getAllCourses);

router.get("/:courseId", CourseController.getSingleCourse);
router.delete("/:courseId", CourseController.deleteCourse);

router.put("/:courseId/assign-faculty", 
    validateRequest(CourseValidations.assignFacultiesWithCourseValidationSchema),CourseController.assignFacultiesWithCourse);

router.patch("/:courseId",
    validateRequest(CourseValidations.updateCoursesValidationSchema), CourseController.updateCourse);

export const CourseRouters = router;
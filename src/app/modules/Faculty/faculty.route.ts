import express from 'express';

import validateRequest from '../../middlwares/validateRequest';
import { updateFacultyValidationSchema } from './vaculty.validation';
import { FacultyControllers } from './faculty.controller';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
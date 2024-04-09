import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { DriverRequestController } from './driver.controller';
import { DriverRequestValidation } from './driver.validation';

const router = Router();

router.post(
  '/',
  validateRequest(DriverRequestValidation.createRequest),
  DriverRequestController.insertIntoDb
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  DriverRequestController.getAllFromDb
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  DriverRequestController.getSingleItem
);

router.patch(
  '/:id',
  validateRequest(DriverRequestValidation.updateRequest),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  DriverRequestController.updateIntoDb
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  DriverRequestController.deleteFromDb
);

export const DriverRoutes = router;

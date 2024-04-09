import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CustomerRequestController } from './customer.controller';
import { CustomerRequestValidation } from './customer.validation';

const router = Router();

router.post(
  '/',
  validateRequest(CustomerRequestValidation.createRequest),
  CustomerRequestController.insertIntoDb
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CustomerRequestController.getAllFromDb
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CustomerRequestController.getSingleItem
);

router.patch(
  '/:id',
  validateRequest(CustomerRequestValidation.updateRequest),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CustomerRequestController.updateIntoDb
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CustomerRequestController.deleteFromDb
);

export const CustomerRoutes = router;

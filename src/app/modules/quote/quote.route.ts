import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { QuoteController } from './quote.controller';
import { QuoteValidation } from './quote.validation';

const router = Router();

router.post(
  '/',
  validateRequest(QuoteValidation.createQuote),
  QuoteController.insertIntoDb
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuoteController.getAllFromDb
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuoteController.getSingleItem
);

router.patch(
  '/:id',
  validateRequest(QuoteValidation.updateQuote),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuoteController.updateIntoDb
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuoteController.deleteFromDb
);

export const QuoteRoutes = router;

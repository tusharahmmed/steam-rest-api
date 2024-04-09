import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import formDataValidation from '../../middlewares/formDataValidation';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'),
  formDataValidation(
    ReviewValidation.createReviewSchema,
    ReviewController.insertIntoDb
  )
  // (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     req.body = TruckValidation.createTruckSchema.parse(
  //       JSON.parse(req.body?.data)
  //     );
  //     return TruckController.insertIntoDb(req, res, next);
  //   } catch (err) {
  //     next(err);
  //   }
  // }
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReviewController.getAllFromDb
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReviewController.getSingeFromDb
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'),
  formDataValidation(
    ReviewValidation.updateReviewSchema,
    ReviewController.updateIntoDb
  )
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReviewController.deleteFormDb
);

export const ReviewRoutes = router;

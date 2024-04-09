import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import formDataValidation from '../../middlewares/formDataValidation';
import { TruckController } from './truck.controller';
import { TruckValidation } from './truck.validation';

const router = Router();

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'),
  formDataValidation(
    TruckValidation.updateTruckSchema,
    TruckController.updateIntoDb
  )
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  TruckController.deleteFormDb
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  TruckController.getSingeFromDb
);
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'),
  formDataValidation(
    TruckValidation.createTruckSchema,
    TruckController.insertIntoDb
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
  TruckController.getAllFromDb
);

export const TruckRoutes = router;

import { USER_ROLE } from '@prisma/client';
import { Router } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
import { ProfileController } from './profile.controller';
// import { ProfileValidation } from './profile.validation';

const router = Router();

router.patch(
  '/',
  // validateRequest(ProfileValidation.updateProfile),
  auth(USER_ROLE.admin, USER_ROLE.hr, USER_ROLE.super_admin),
  FileUploadHelper.upload.single('file'),
  ProfileController.updateDocument
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.hr, USER_ROLE.super_admin),
  ProfileController.getProfile
);

export const ProfileRoutes = router;

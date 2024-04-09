import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getProfile = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await ProfileService.getProfile(user as JwtPayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile retrieved successfully',
    data: result,
  });
});
const updateDocument = catchAsync(async (req, res) => {
  const payload = req.body.data;
  const file = req?.file;
  const user = req.user;
  const id = user?.id;

  const result = await ProfileService.updateDocument(
    id,
    user as JwtPayload,
    JSON.parse(payload),
    file
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const ProfileController = {
  getProfile,
  updateDocument,
};

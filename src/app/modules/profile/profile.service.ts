/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import prisma from '../../../shared/prisma';
import { excludeFields } from '../../../shared/utils';

// get profile
const getProfile = async (requestedUser: JwtPayload) => {
  const result = await prisma.user.findUnique({
    where: {
      id: requestedUser?.id,
    },
  });

  const passwordRemoved = excludeFields(result, ['password'] as any);

  return passwordRemoved;
};

// update profile
const updateDocument = async (
  id: string,
  user: JwtPayload,
  payload: Partial<User>,
  file: any
) => {
  const requestedUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  // check same user
  if (requestedUser && requestedUser.id !== id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden!');
  }

  // if has password
  if (payload?.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bycrypt_salt_rounds)
    );
  }
  // if has file
  if (file && !requestedUser?.profileImage) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (!uploadedImage) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
    }
    payload.profileImage = uploadedImage.secure_url as string;
  }
  // if already uploaded then update image
  if (file && requestedUser?.profileImage) {
    const response = await FileUploadHelper.replaceImage(
      requestedUser.profileImage,
      file
    );
    if (!response) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
    }
    payload.profileImage = response.secure_url as string;
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  const removedPassword = excludeFields(result as User, ['password']);
  return removedPassword;
};

export const ProfileService = {
  getProfile,
  updateDocument,
};

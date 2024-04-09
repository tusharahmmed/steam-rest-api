import { Review } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (payload: Review, file: IUploadFile) => {
  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'image is required');
  }

  // if has file
  if (file) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (!uploadedImage) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
    }
    payload.image = uploadedImage.secure_url as string;
  }

  const result = await prisma.review.create({
    data: payload,
  });

  return result;
};

const getAllFromDb = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Review[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.review.findMany({
    // pagination
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.review.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingeFromDb = async (id: string) => {
  const result = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateIntoDb = async (id: string, payload: Review, file: IUploadFile) => {
  const existingReview = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  // if has file
  if (file && !existingReview?.image) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (!uploadedImage) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
    }
    payload.image = uploadedImage.secure_url as string;
  }
  // if already uploaded then update image
  if (file && existingReview?.image) {
    const response = await FileUploadHelper.replaceImage(
      existingReview.image,
      file
    );
    if (!response) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
    }
    payload.image = response.secure_url as string;
  }

  const result = await prisma.review.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteFormDb = async (id: string) => {
  const result = await prisma.review.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ReviewService = {
  insertIntoDb,
  getAllFromDb,
  getSingeFromDb,
  updateIntoDb,
  deleteFormDb,
};

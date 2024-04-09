/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';

const insertIntoDb = catchAsync(async (req, res) => {
  const payload = req.body;
  const file = req?.file;

  const result = await ReviewService.insertIntoDb(payload, file as any);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req, res) => {
  const options = pick(req.query, PAGINATION_FIELDS);

  const result = await ReviewService.getAllFromDb(options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingeFromDb = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ReviewService.getSingeFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully',
    data: result,
  });
});

const updateIntoDb = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const file = req?.file;

  const result = await ReviewService.updateIntoDb(id, payload, file as any);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

const deleteFormDb = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ReviewService.deleteFormDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const ReviewController = {
  insertIntoDb,
  getAllFromDb,
  getSingeFromDb,
  updateIntoDb,
  deleteFormDb,
};

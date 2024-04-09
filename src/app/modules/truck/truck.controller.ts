/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { TruckService } from './truck.service';

const insertIntoDb = catchAsync(async (req, res) => {
  const payload = req.body;
  const file = req?.file;

  const result = await TruckService.insertIntoDb(payload, file as any);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Truck created successfully',
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req, res) => {
  const options = pick(req.query, PAGINATION_FIELDS);

  const result = await TruckService.getAllFromDb(options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trucks retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingeFromDb = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await TruckService.getSingeFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Truck retrieved successfully',
    data: result,
  });
});

const updateIntoDb = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const file = req?.file;

  const result = await TruckService.updateIntoDb(id, payload, file as any);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Truck updated successfully',
    data: result,
  });
});

const deleteFormDb = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await TruckService.deleteFormDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Truck deleted successfully',
    data: result,
  });
});

export const TruckController = {
  insertIntoDb,
  getAllFromDb,
  getSingeFromDb,
  updateIntoDb,
  deleteFormDb,
};

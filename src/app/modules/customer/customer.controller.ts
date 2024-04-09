import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CUSTOMER_REQUEST_FILTERED_FIELDS } from './customer.constant';
import { CustomerRequestService } from './customer.service';

const insertIntoDb = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await CustomerRequestService.insertIntoDb(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Request submitted successfully',
    data: result,
  });
});

// get all users
const getAllFromDb = catchAsync(async (req, res) => {
  const options = pick(req.query, PAGINATION_FIELDS);
  const filters = pick(req.query, CUSTOMER_REQUEST_FILTERED_FIELDS);

  const result = await CustomerRequestService.getAllFrom(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Requests retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleItem = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CustomerRequestService.getSingleItem(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Request fetched successfully',
    data: result,
  });
});
const updateIntoDb = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await CustomerRequestService.updateIntoDb(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Request updated successfully',
    data: result,
  });
});
const deleteFromDb = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CustomerRequestService.deleteFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Request deleted successfully',
    data: result,
  });
});

export const CustomerRequestController = {
  insertIntoDb,
  getAllFromDb,
  getSingleItem,
  updateIntoDb,
  deleteFromDb,
};

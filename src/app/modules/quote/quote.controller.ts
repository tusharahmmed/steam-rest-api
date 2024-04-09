import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { QUOTE_FILTERED_FIELDS } from './quote.constant';
import { QuoteService } from './quote.service';

const insertIntoDb = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await QuoteService.insertIntoDb(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quote submitted successfully',
    data: result,
  });
});

// get all users
const getAllFromDb = catchAsync(async (req, res) => {
  const options = pick(req.query, PAGINATION_FIELDS);
  const filters = pick(req.query, QUOTE_FILTERED_FIELDS);

  const result = await QuoteService.getAllFrom(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'quotes retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleItem = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await QuoteService.getSingleItem(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quote fetched successfully',
    data: result,
  });
});
const updateIntoDb = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await QuoteService.updateIntoDb(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quote updated successfully',
    data: result,
  });
});
const deleteFromDb = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await QuoteService.deleteFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quote deleted successfully',
    data: result,
  });
});

export const QuoteController = {
  insertIntoDb,
  getAllFromDb,
  getSingleItem,
  updateIntoDb,
  deleteFromDb,
};

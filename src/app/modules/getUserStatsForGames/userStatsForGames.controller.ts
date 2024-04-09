import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserStatsForGamesService } from './userStatsForGames.service';

const getStats = catchAsync(async (req, res) => {
  const callback = (err: any, data: any) => {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Profile retrieved successfully',
      data: data,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const result = await UserStatsForGamesService.getStats(callback);

  // sendResponse(res, {
  //   success: true,
  //   statusCode: httpStatus.OK,
  //   message: 'Profile retrieved successfully',
  //   data: result,
  // });
});

export const UserStatsForGamesController = {
  getStats,
};

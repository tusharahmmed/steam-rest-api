import { DriverRequest, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { DRIVER_REQUEST_SEARCH_FIELDS } from './driver.constant';
import { IDriverRequestFilters } from './driver.interface';

const insertIntoDb = async (payload: DriverRequest) => {
  const result = await prisma.driverRequest.create({
    data: payload,
  });

  return result;
};

// get all user
const getAllFrom = async (
  options: IPaginationOptions,
  filters: IDriverRequestFilters
): Promise<IGenericResponse<DriverRequest[]>> => {
  // paginatin
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // filters
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  // generate search condition
  if (searchTerm) {
    andConditions.push({
      OR: DRIVER_REQUEST_SEARCH_FIELDS.map(field => {
        if (field !== 'status') {
          return {
            [field]: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          };
        } else {
          let search;
          if ('pending'.startsWith(searchTerm.toLowerCase())) {
            search = 'pending';
          }
          if ('canceled'.startsWith(searchTerm.toLowerCase())) {
            search = 'canceled';
          }
          if ('completed'.startsWith(searchTerm.toLowerCase())) {
            search = 'completed';
          }

          return {
            [field]: {
              equals: search,
            },
          };
        }
      }),
    });
  }

  // generate filter condition
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.DriverRequestWhereInput | any =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.driverRequest.findMany({
    // filters
    where: whereConditions,
    //pagination
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.driverRequest.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleItem = async (id: string) => {
  const result = await prisma.driverRequest.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateIntoDb = async (id: string, payload: DriverRequest) => {
  const result = await prisma.driverRequest.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteFromDb = async (id: string) => {
  const result = await prisma.driverRequest.delete({
    where: {
      id,
    },
  });
  return result;
};

export const DriverRequestService = {
  insertIntoDb,
  getAllFrom,
  getSingleItem,
  updateIntoDb,
  deleteFromDb,
};

import { Prisma, QuoteRequest } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { QUOTE_SEARCH_FIELDS } from './quote.constant';
import { IQuoteFilters } from './quote.interface';

const insertIntoDb = async (payload: QuoteRequest) => {
  const result = await prisma.quoteRequest.create({
    data: payload,
  });

  return result;
};

// get all user
const getAllFrom = async (
  options: IPaginationOptions,
  filters: IQuoteFilters
): Promise<IGenericResponse<QuoteRequest[]>> => {
  // paginatin
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // filters
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  // generate search condition
  if (searchTerm) {
    andConditions.push({
      OR: QUOTE_SEARCH_FIELDS.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
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

  const whereConditions: Prisma.QuoteRequestWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.quoteRequest.findMany({
    // filters
    where: whereConditions,
    //pagination
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.quoteRequest.count({ where: whereConditions });

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
  const result = await prisma.quoteRequest.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateIntoDb = async (id: string, payload: QuoteRequest) => {
  const result = await prisma.quoteRequest.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteFromDb = async (id: string) => {
  const result = await prisma.quoteRequest.delete({
    where: {
      id,
    },
  });
  return result;
};

export const QuoteService = {
  insertIntoDb,
  getAllFrom,
  getSingleItem,
  updateIntoDb,
  deleteFromDb,
};

import { z } from 'zod';

const createReviewSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
});

const updateReviewSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export const ReviewValidation = {
  createReviewSchema,
  updateReviewSchema,
};

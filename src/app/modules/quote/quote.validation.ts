import { z } from 'zod';
import { ENUM_STATUS } from '../../../enums/user';

const createQuote = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    serName: z.string({ required_error: 'Ser Name is required' }),
    phone: z.string({ required_error: 'Phone is required' }),
    email: z.string({ required_error: 'Email is required' }),
    pickupZip: z.string({ required_error: 'Pickup Zip is required' }),
    deliveryZip: z.string({ required_error: 'Delivery Zip is required' }),
    totalPices: z.string({ required_error: 'Total pices is required' }),
    totalWeight: z.number({ required_error: 'Total weight is required' }),
    question: z.string({ required_error: 'Question is required' }),
    status: z.enum([...ENUM_STATUS] as [string, ...string[]]).optional(),
  }),
});

const updateQuote = z.object({
  body: z.object({
    name: z.string().optional(),
    serName: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    pickupZip: z.string().optional(),
    deliveryZip: z.string().optional(),
    totalPices: z.string().optional(),
    totalWeight: z.number().optional(),
    question: z.string().optional(),
    status: z.enum([...ENUM_STATUS] as [string, ...string[]]).optional(),
  }),
});

export const QuoteValidation = {
  createQuote,
  updateQuote,
};

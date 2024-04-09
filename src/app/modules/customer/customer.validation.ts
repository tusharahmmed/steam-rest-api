import { z } from 'zod';
import { ENUM_STATUS } from '../../../enums/user';

const createRequest = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    serName: z.string({ required_error: 'Ser Name is required' }),
    phone: z.string({ required_error: 'Phone is required' }),
    email: z.string({ required_error: 'Email is required' }),
    truckType: z.string({ required_error: 'Truck type is required' }),
    truckDescription: z.string({
      required_error: 'Truck description is required',
    }),
    status: z.enum([...ENUM_STATUS] as [string, ...string[]]).optional(),
  }),
});

const updateRequest = z.object({
  body: z.object({
    name: z.string().optional(),
    serName: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    truckType: z.string().optional(),
    truckDescription: z.string().optional(),
    status: z.enum([...ENUM_STATUS] as [string, ...string[]]).optional(),
  }),
});

export const CustomerRequestValidation = {
  createRequest,
  updateRequest,
};

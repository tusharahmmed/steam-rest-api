import { z } from 'zod';

const createTruckSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  description: z.string({
    required_error: 'Content is required',
  }),
  pallets: z.string({
    required_error: 'Pallets is required',
  }),
  weight: z.string({
    required_error: 'Weight is required',
  }),
  doorSize: z.string({
    required_error: 'Door size is required',
  }),
  cargoSpace: z.string({
    required_error: 'Cargo space size is required',
  }),
});

const updateTruckSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  pallets: z.string().optional(),
  weight: z.string().optional(),
  doorSize: z.string().optional(),
  cargoSpace: z.string().optional(),
});

export const TruckValidation = {
  createTruckSchema,
  updateTruckSchema,
};

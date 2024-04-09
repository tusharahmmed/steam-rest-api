import { USER_ROLE } from '@prisma/client';
import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    serName: z.string({ required_error: 'Ser Name is required' }),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
    role: z.enum([...Object.values(USER_ROLE)] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    permissions: z
      .array(z.string(), { required_error: 'Permissions is required' })
      .nonempty(),
    phone: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

const updateUser = z.object({
  body: z.object({
    name: z.string().optional(),
    serName: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z
      .enum([...Object.values(USER_ROLE)] as [string, ...string[]])
      .optional(),
    permissions: z.array(z.string()).nonempty().optional(),
    phone: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const UserValidation = {
  createUser,
  updateUser,
};

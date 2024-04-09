import { USER_ROLE } from '@prisma/client';
import { z } from 'zod';

const updateProfile = z.object({
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

export const ProfileValidation = {
  updateProfile,
};

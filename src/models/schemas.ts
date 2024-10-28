import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['creator', 'reader']),
});

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  // content: z.string().min(1, 'Content is required'),
  category: z.string().min(1, 'category is required'),
  allowImage: z.boolean(),
  allowVideo: z.boolean(),
  allowText: z.boolean(),
});
export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required')
});
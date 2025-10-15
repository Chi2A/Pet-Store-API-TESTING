import { z } from "zod";

/**
 * User schema for API response validation
 */
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
});

/**
 * Array of users schema
 */
export const UsersArraySchema = z.array(UserSchema);

/**
 * Post schema for API response validation
 */
export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

/**
 * Array of posts schema
 */
export const PostsArraySchema = z.array(PostSchema);

/**
 * Type inference from schemas
 */
export type User = z.infer<typeof UserSchema>;
export type Post = z.infer<typeof PostSchema>;

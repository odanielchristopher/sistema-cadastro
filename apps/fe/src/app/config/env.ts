import { z } from 'zod';

export const schema = z.object({
  VITE_API_URL: z.string().nonempty(),
});

export type Env = z.infer<typeof schema>;

export const env = schema.parse(import.meta.env);

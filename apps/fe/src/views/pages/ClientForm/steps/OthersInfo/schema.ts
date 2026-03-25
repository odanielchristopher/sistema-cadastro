import z from 'zod';

export const othersInfoSchema = z.object({
  colorId: z.string().uuid().nonempty('A cor é obrigatória.'),
  observations: z.string().optional(),
});

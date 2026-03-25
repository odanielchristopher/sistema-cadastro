import z from 'zod';

export const colorFormSchema = z.object({
  name: z.string().trim().min(1, 'O nome da cor é obrigatório.'),
  hex: z
    .string()
    .trim()
    .regex(/^#([0-9a-fA-F]{6})$/, 'Informe um hexadecimal válido.'),
});

export type ColorFormValues = z.infer<typeof colorFormSchema>;

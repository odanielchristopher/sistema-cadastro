import z from 'zod';

export const profileInfoSchema = z.object({
  name: z
    .string()
    .nonempty('O nome é obrigatório')
    .min(2, 'O nome deve ter mais de 2 caracteres'),
  cpf: z
    .string()
    .min(11, 'O CPF deve ser válido')
    .nonempty('O CPF é obrigatório'),
  email: z
    .string()
    .email('O e-mail deve ser válido')
    .nonempty('O e-mail é obrigatório'),
});

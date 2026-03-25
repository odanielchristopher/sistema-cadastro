import z from 'zod';

import { isValidCPF } from '@app/utils/isValidCpf';

export const profileInfoSchema = z.object({
  name: z
    .string()
    .nonempty('O nome é obrigatório')
    .min(2, 'O nome deve ter mais de 2 caracteres'),
  cpf: z.string().nonempty('O CPF é obrigatório').refine(isValidCPF, {
    message: 'Este CPF é inválido',
  }),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('O e-mail deve ser válido'),
});

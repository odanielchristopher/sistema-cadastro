import type { Color } from './Color';

export type Client = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  color: Color;
  observations: string | null;
};

import { Color } from '@modules/colors/entities/color.entity';

export class Client {
  id: string;
  name: string;
  email: string;
  cpf: string;
  colorId: string;
  observations: string | null;

  createdAt: Date;
  updatedAt: Date;

  color?: Color;
}

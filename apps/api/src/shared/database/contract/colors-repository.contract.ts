import { Color } from '@modules/colors/entities/color.entity';

export abstract class ColorsRepository {
  abstract findMany(): Promise<Color[]>;
}

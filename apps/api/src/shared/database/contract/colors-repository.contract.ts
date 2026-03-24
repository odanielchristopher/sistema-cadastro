import { Color } from '@modules/colors/entities/color.entity';

export abstract class ColorsRepository {
  abstract findMany(): Promise<Color[]>;
  abstract findByName(name: string): Promise<Color | null>;
  abstract create(color: Pick<Color, 'name' | 'hex'>): Promise<Color>;
}

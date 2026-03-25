import type { Color } from '@app/entities/Color';

import { httpClient } from '../httpClient';

export type CreateColorInput = Pick<Color, 'name' | 'hex'>;

export async function create(input: CreateColorInput) {
  const { data } = await httpClient.post<Color>('/colors', input);

  return data;
}

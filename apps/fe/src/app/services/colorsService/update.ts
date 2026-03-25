import type { Color } from '@app/entities/Color';

import { httpClient } from '../httpClient';

export type UpdateColorInput = Pick<Color, 'id' | 'name' | 'hex'>;

export async function update(input: UpdateColorInput) {
  const { data } = await httpClient.put<Color>(`/colors/${input.id}`, input);

  return data;
}

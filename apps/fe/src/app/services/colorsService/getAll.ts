import type { Color } from '@app/entities/Color';

import { httpClient } from '../httpClient';

export async function getAll() {
  const { data } = await httpClient.get<Color[]>('/colors');

  return data;
}

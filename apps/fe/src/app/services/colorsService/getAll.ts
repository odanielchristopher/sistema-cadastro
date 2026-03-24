import type { Color } from '@app/entities/Color';
import { sleep } from '@app/utils/sleep';

import { httpClient } from '../httpClient';

export async function getAll() {
  await sleep(2000);

  const { data } = await httpClient.get<Color[]>('/colors');

  return data;
}

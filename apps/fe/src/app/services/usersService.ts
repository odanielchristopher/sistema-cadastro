import type { AxiosInstance } from 'axios';

import type { IUser } from '@app/entities/User';

import { httpClient } from './httpClient';

class UsersService {
  constructor(private readonly httpClient: AxiosInstance) {}

  me = async (): Promise<UsersService.MeOutput> => {
    const { data } =
      await this.httpClient.get<UsersService.MeOutput>('/users/me');

    return data;
  };
}

export const usersService = new UsersService(httpClient);

export namespace UsersService {
  export type MeOutput = IUser;
}

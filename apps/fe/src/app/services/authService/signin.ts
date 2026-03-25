import { httpClient } from '../httpClient';

export type SignInInput = {
  email: string;
  password: string;
};

export type SignInOutput = {
  accessToken: string;
};

export async function signin(input: SignInInput) {
  const { data } = await httpClient.post<SignInOutput>('/auth/sign-in', input);

  return data;
}

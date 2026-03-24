import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, {
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { toast } from 'sonner';

import { AUTH_QUERY_KEY } from '@app/config/constants';
import { localStorageKeys } from '@app/config/localStorageKeys';
import type { User } from '@app/entities/User';
import { httpClient } from '@app/services/httpClient';
import { usersService } from '@app/services/usersService';
import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { LaunchScreen } from '@views/components/app/LaunchScreen';

interface IAuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  signin(accessToken: string, refreshToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storagedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    );

    return !!storagedAccessToken;
  });
  const queryClient = useQueryClient();

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: AUTH_QUERY_KEY(),
    queryFn: usersService.me,
    staleTime: Infinity,
    enabled: signedIn,
  });

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    return () => {
      httpClient.interceptors.request.eject(interceptorId);
    };
  }, []);

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    queryClient.removeQueries();

    setSignedIn(false);
  }, [queryClient]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Bem-vindo, ${capitalizeFirstLetter(data.name)}!`);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess,
        user: data,
        signin,
        signout,
      }}
    >
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}

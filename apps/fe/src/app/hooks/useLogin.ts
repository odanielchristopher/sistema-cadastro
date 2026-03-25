import { useMutation } from '@tanstack/react-query';

import { authService } from '@app/services/authService';

export function useLogin() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: authService.signin,
  });

  return {
    login: mutateAsync,
    isLoading: isPending,
  };
}

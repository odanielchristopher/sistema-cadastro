import { Navigate, Outlet } from 'react-router';

import { routes } from '@app/Router/routes';

import { useAuth } from '../hooks/useAuth';

interface IAuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: IAuthGuardProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    return <Navigate to={routes.login} replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to={routes.dashboard} replace />;
  }

  return <Outlet />;
}

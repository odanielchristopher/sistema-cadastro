import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { AuthGuard } from '@app/guards/AuthGuard';
import { lazyLoad } from '@app/utils/lazyLoad';
import { LaunchScreen } from '@views/components/app/LaunchScreen';

import { routes } from './routes';

const { AuthLayout } = lazyLoad(() => import('@views/layouts/AuthLayout'));

const { Dashboard } = lazyLoad(() => import('@views/pages/Dashboard'));
const { Login } = lazyLoad(() => import('@views/pages/Login'));
const { ClientForm } = lazyLoad(() => import('@views/pages/ClientForm'));

export function Router() {
  return (
    <Suspense fallback={<LaunchScreen />}>
      <Routes>
        <Route element={<AuthGuard isPrivate />}>
          <Route path={routes.dashboard} element={<Dashboard />} />
        </Route>

        <Route element={<AuthGuard isPrivate={false} />}>
          <Route index element={<ClientForm />} />

          <Route element={<AuthLayout />}>
            <Route path={routes.login} element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

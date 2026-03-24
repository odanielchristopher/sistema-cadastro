import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { AuthGuard } from '@app/guards/AuthGuard';
import { lazyLoad } from '@app/utils/lazyLoad';
import { LaunchScreen } from '@views/components/app/LaunchScreen';
import { Dashboard } from '@views/pages/Dashboard';

import { routes } from './routes';

const { AuthLayout } = lazyLoad(() => import('@views/layouts/AuthLayout'));

const { Login } = lazyLoad(() => import('@views/pages/Login'));
const { Form } = lazyLoad(() => import('@views/pages/Form'));

export function Router() {
  return (
    <Suspense fallback={<LaunchScreen />}>
      <Routes>
        <Route element={<AuthGuard isPrivate />}></Route>

        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path={routes.dashboard} element={<Dashboard />} />

          <Route index element={<Form />} />
          <Route element={<AuthLayout />}>
            <Route path={routes.login} element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { AuthGuard } from '@app/guards/AuthGuard';
import { lazyLoad } from '@app/utils/lazyLoad';
import { LaunchScreen } from '@views/components/app/LaunchScreen';

import { routes } from './routes';

const { AuthLayout } = lazyLoad(() => import('@views/layouts/AuthLayout'));
const { AppLayout } = lazyLoad(() => import('@views/layouts/AppLayout'));

const { Login } = lazyLoad(() => import('@views/pages/Login'));
const { Form } = lazyLoad(() => import('@views/pages/Form'));

export function Router() {
  return (
    <Suspense fallback={<LaunchScreen />}>
      <Routes>
        <Route element={<AuthGuard isPrivate />}>
          <Route element={<AppLayout />}></Route>
        </Route>

        <Route element={<AuthGuard isPrivate={false} />}>
          <Route index element={<Form />} />
          <Route element={<AuthLayout />}>
            <Route path={routes.login} element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

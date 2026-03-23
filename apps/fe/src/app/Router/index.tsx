import { AnimatePresence } from 'motion/react';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { AuthGuard } from '@app/guards/AuthGuard';
import { lazyLoad } from '@app/utils/lazyLoad';
import { LaunchScreen } from '@views/components/app/LaunchScreen';

import { routes } from './routes';

const { AuthLayout } = lazyLoad(() => import('@views/layouts/AuthLayout'));
const { AppLayout } = lazyLoad(() => import('@views/layouts/AppLayout'));

const { Login } = lazyLoad(() => import('@views/pages/Login'));

export function Router() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LaunchScreen />}>
        <Routes>
          <Route index element={<Navigate to={routes.login} />} />
          <Route element={<AuthGuard isPrivate />}>
            <Route element={<AppLayout />}></Route>
          </Route>

          <Route element={<AuthGuard isPrivate={false} />}>
            <Route element={<AuthLayout />}>
              <Route path={routes.login} element={<Login />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

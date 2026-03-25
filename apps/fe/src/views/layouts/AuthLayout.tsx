import { HomeIcon } from 'lucide-react';
import { Link, Outlet } from 'react-router';

import { routes } from '@app/Router/routes';
import { Button } from '@views/components/ui/Button';
import { Logo } from '@views/components/ui/Logo';

export function AuthLayout() {
  return (
    <div className="relative flex h-full w-full flex-col">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="absolute right-4 top-6 rounded-md"
        asChild
      >
        <Link to={routes.home}>
          <HomeIcon />

          <span className="leading-3">Ir para o cadastro</span>
        </Link>
      </Button>

      <div className="flex h-full w-full flex-col items-center justify-center gap-8">
        <Logo
          classNames={{
            icon: 'size-8',
            title: 'text-2xl',
          }}
        />

        <div className="w-full max-w-[504px] px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

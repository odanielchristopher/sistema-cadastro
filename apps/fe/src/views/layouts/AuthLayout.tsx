import { HomeIcon } from 'lucide-react';
import { Link, Outlet } from 'react-router';

import { routes } from '@app/Router/routes';
import { EtegLogo } from '@views/assets/EtegLogo';
import { ThemeSwitcher } from '@views/components/app/ThemeSwitcher';
import { Button } from '@views/components/ui/Button';
import { Logo } from '@views/components/ui/Logo';

export function AuthLayout() {
  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="absolute right-4 top-6 flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-md"
          asChild
        >
          <Link to={routes.home}>
            <HomeIcon />

            <span className="leading-3">Ir para o cadastro</span>
          </Link>
        </Button>

        <ThemeSwitcher variant="outline" />
      </div>

      <EtegLogo className="absolute left-6 top-6 h-10 w-20" />

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

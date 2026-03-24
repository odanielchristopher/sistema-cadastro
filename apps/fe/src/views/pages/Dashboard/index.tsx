import { HomeIcon, LogOutIcon } from 'lucide-react';

import { Button } from '@views/components/ui/Button';

export function Dashboard() {
  return (
    <>
      <header className="bg-card border-b py-4">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Dashboard</h3>
            <small className="text-sm">Painel de administração</small>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" className="rounded-sm">
              <HomeIcon /> Ir para o cadastro
            </Button>

            <Button
              type="button"
              variant="outline"
              className="text-destructive hover:text-destructive/90 rounded-sm"
            >
              <LogOutIcon />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className=""></main>
    </>
  );
}

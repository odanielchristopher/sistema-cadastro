import {
  HomeIcon,
  LogOutIcon,
  PaletteIcon,
  PlusIcon,
  Users2Icon,
} from 'lucide-react';

import { Button } from '@views/components/ui/Button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@views/components/ui/Tabs';

export function Dashboard() {
  return (
    <div className="flex h-full w-full flex-col">
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

      <main className="mx-auto mt-10 flex w-full max-w-7xl flex-1 px-6">
        <Tabs
          className="mx-auto flex w-full flex-1 flex-col items-center gap-6 pb-6"
          defaultValue="clients"
        >
          <TabsList className="w-full max-w-[600px] rounded-2xl">
            <TabsTrigger className="rounded-2xl" value="clients">
              <Users2Icon />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="colors">
              <PaletteIcon />
              Cores
            </TabsTrigger>
          </TabsList>

          <TabsContent
            className="bg-card h-full w-full rounded-2xl border p-6"
            value="clients"
          >
            <header>
              <div className="mb-2 flex items-center gap-3">
                <Users2Icon />
                <h3 className="text-lg font-semibold">Clientes cadastrados</h3>
              </div>

              <p className="text-muted-foreground">
                Lista de todos os clientes que se cadastraram no sistema
              </p>
            </header>
          </TabsContent>

          <TabsContent
            className="bg-card h-full w-full rounded-2xl border p-6"
            value="colors"
          >
            <header className="flex items-center justify-between">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <PaletteIcon />
                  <h3 className="text-lg font-semibold">
                    Gerenciamento de Cores
                  </h3>
                </div>

                <p className="text-muted-foreground">
                  Gerencie as cores disponíveis no arco-íris para cadastro
                </p>
              </div>

              <Button type="button" className="rounded-sm" size="sm">
                <PlusIcon /> Adicionar nova cor
              </Button>
            </header>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

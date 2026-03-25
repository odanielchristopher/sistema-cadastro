import {
  HomeIcon,
  LogOutIcon,
  PaletteIcon,
  PlusIcon,
  Users2Icon,
} from 'lucide-react';
import { Link } from 'react-router';

import { useAuth } from '@app/hooks/useAuth';
import { routes } from '@app/Router/routes';
import { EtegLogo } from '@views/assets/EtegLogo';
import { ClientsAccordion } from '@views/components/app/ClientsAccordion';
import { ClientsFilters } from '@views/components/app/ClientsFilters';
import { ColorsTable } from '@views/components/app/ColorsTable';
import { ThemeSwitcher } from '@views/components/app/ThemeSwitcher';
import { Button } from '@views/components/ui/Button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@views/components/ui/Tabs';
import { EditColorModal } from '@views/modals/EditColorModal';
import { NewColorModal } from '@views/modals/NewColorModal';

import { useDashboardController } from './useDashboardController';

export function Dashboard() {
  const {
    closeEditColorModal,
    closeNewColorModal,
    clientsFilters,
    handleClientNameChange,
    handleColorChange,
    isEditColorModalOpen,
    isNewColorModalOpen,
    openEditColorModal,
    openNewColorModal,
    selectedColor,
  } = useDashboardController();
  const { signout } = useAuth();

  return (
    <div className="flex h-full w-full flex-col">
      <header className="bg-card border-b py-4">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          <div className="flex flex-col">
            <EtegLogo className="h-10 w-20" />
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-sm"
              asChild
            >
              <Link to={routes.home}>
                <HomeIcon /> Ir para o cadastro
              </Link>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="text-destructive hover:text-destructive/90 rounded-sm"
              onClick={signout}
            >
              <LogOutIcon />
              Sair
            </Button>

            <ThemeSwitcher
              variant="outline"
              size="default"
              className="p-3 px-3"
            />
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
            <header className="mb-6">
              <div className="mb-2 flex items-center gap-3">
                <Users2Icon />
                <h3 className="text-lg font-semibold">Clientes cadastrados</h3>
              </div>

              <p className="text-muted-foreground">
                Lista de todos os clientes que se cadastraram no sistema
              </p>
            </header>

            <ClientsFilters
              clientName={clientsFilters.clientName}
              colorId={clientsFilters.colorId}
              onClientNameChange={handleClientNameChange}
              onColorChange={handleColorChange}
            />

            <ClientsAccordion
              clientName={clientsFilters.clientName}
              colorId={clientsFilters.colorId}
            />
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

              <Button
                type="button"
                className="rounded-sm"
                size="sm"
                onClick={openNewColorModal}
              >
                <PlusIcon /> Adicionar nova cor
              </Button>
            </header>

            <ColorsTable onEdit={openEditColorModal} />
          </TabsContent>
        </Tabs>
      </main>

      <NewColorModal open={isNewColorModalOpen} onClose={closeNewColorModal} />

      <EditColorModal
        open={isEditColorModalOpen}
        color={selectedColor}
        onClose={closeEditColorModal}
      />
    </div>
  );
}

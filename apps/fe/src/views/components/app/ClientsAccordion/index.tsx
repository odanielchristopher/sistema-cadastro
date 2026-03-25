import { UserIcon } from 'lucide-react';

import { cn } from '@app/lib/utils';
import { InfiniteScrollContainer } from '@views/components/app/InfiniteScrollContainer';
import { Spinner } from '@views/components/ui/Spinner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@views/components/ui/Accordion';

import { useClientsAccordionController } from './useClientsAccordionController';

function getTintFromHex(hex: string) {
  const normalizedHex = hex.replace('#', '');

  if (normalizedHex.length !== 6) return '#ffffff';

  const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

  const mix = (channel: number) =>
    Math.round(channel + (255 - channel) * 0.88)
      .toString(16)
      .padStart(2, '0');

  if ([red, green, blue].some(Number.isNaN)) return '#ffffff';

  return `#${mix(red)}${mix(green)}${mix(blue)}`;
}

export function ClientsAccordion() {
  const { clients, infiniteScroll, isLoading } =
    useClientsAccordionController();

  if (isLoading && clients.length === 0) {
    return (
      <div className="grid min-h-56 place-items-center">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  if (!isLoading && clients.length === 0) {
    return (
      <div className="text-muted-foreground grid min-h-56 place-items-center rounded-2xl border border-dashed">
        Nenhum cliente cadastrado ainda.
      </div>
    );
  }

  return (
    <InfiniteScrollContainer
      isLoading={isLoading}
      infiniteScroll={infiniteScroll}
    >
      <Accordion type="single" collapsible className="w-full">
        {clients.map((client) => {
          const lightBg = getTintFromHex(client.color.hex);

          return (
            <AccordionItem
              key={client.id}
              value={client.id}
              className="bg-background mb-3 rounded-2xl border px-4 last:mb-0"
            >
              <AccordionTrigger className="py-4 hover:no-underline">
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="grid size-11 shrink-0 place-items-center rounded-full border shadow-sm"
                      style={{ backgroundColor: lightBg }}
                    >
                      <UserIcon
                        className="size-5"
                        style={{ color: client.color.hex }}
                      />
                    </span>

                    <div className="min-w-0 text-left">
                      <p className="truncate font-semibold">{client.name}</p>
                      <p className="text-muted-foreground truncate text-sm">
                        {client.email}
                      </p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5',
                    )}
                  >
                    <span
                      className="border-border size-3 rounded-full border"
                      style={{ backgroundColor: client.color.hex }}
                    />
                    <span className="text-sm font-medium">
                      {client.color.name}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pt-0">
                <div className="bg-muted/30 grid gap-4 rounded-2xl p-4">
                  <div>
                    <span className="text-muted-foreground text-xs uppercase tracking-wide">
                      CPF
                    </span>
                    <p className="font-medium">{client.cpf}</p>
                  </div>

                  <div>
                    <span className="text-muted-foreground text-xs uppercase tracking-wide">
                      Observações
                    </span>
                    <p className="whitespace-pre-wrap">
                      {client.observations?.trim()
                        ? client.observations
                        : 'Sem observações'}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </InfiniteScrollContainer>
  );
}

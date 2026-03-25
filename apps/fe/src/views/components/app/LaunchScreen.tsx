import { SquareChartGanttIcon } from 'lucide-react';

import { Spinner } from '../ui/Spinner';

import { ReactPortal } from './ReactPortal';

export function LaunchScreen({ isLoading }: { isLoading?: boolean }) {
  return (
    <ReactPortal containerId="launch-screen">
      {isLoading && (
        <div className="bg-primary-900 absolute top-0 grid h-full w-full place-items-center">
          <div className="animate-wiggle flex flex-col items-center">
            <div className="mb-4 flex items-center gap-2">
              <SquareChartGanttIcon className="size-8 text-white" />

              <h1 className="text-2xl font-semibold text-white">
                Sistema de Cadastro
              </h1>
            </div>

            <Spinner className="fill-primary-900" />
          </div>
        </div>
      )}
    </ReactPortal>
  );
}

import { EtegLogo } from '@views/assets/EtegLogo';

import { Spinner } from '../ui/Spinner';

import { ReactPortal } from './ReactPortal';

export function LaunchScreen({ isLoading }: { isLoading?: boolean }) {
  return (
    <ReactPortal containerId="launch-screen">
      {isLoading && (
        <div className="bg-primary absolute top-0 grid h-full w-full place-items-center">
          <div className="animate-wiggle flex flex-col items-center">
            <div className="mb-4 flex flex-col items-center gap-2">
              <EtegLogo className="w-30 h-12 fill-white" />

              <h1 className="text-2xl font-semibold text-white">
                Sistema de Cadastro
              </h1>
            </div>

            <Spinner className="fill-primary" />
          </div>
        </div>
      )}
    </ReactPortal>
  );
}

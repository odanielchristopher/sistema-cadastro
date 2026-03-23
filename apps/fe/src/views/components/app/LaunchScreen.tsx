import { SquareChartGanttIcon } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';

import { Spinner } from '../ui/Spinner';

import { ReactPortal } from './ReactPortal';

export function LaunchScreen({ isLoading }: { isLoading?: boolean }) {
  return (
    <ReactPortal containerId="launch-screen">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            className="bg-primary-900 absolute top-0 grid h-full w-full place-items-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="animate-wiggle flex flex-col items-center">
              <div className="mb-4 flex items-center gap-2">
                <SquareChartGanttIcon className="size-8 text-white" />

                <h1 className="text-2xl font-semibold text-white">Neddo</h1>
              </div>

              <Spinner className="fill-primary-900" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ReactPortal>
  );
}

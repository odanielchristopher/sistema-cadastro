import { X } from 'lucide-react';
import React from 'react';

import { cn } from '@app/lib/utils';

import { Dialog, DialogContent, DialogTitle } from './Dialog';

interface IModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
  onClose?(): void;
}

export function Modal({
  title,
  open,
  children,
  rightAction,
  onClose,
}: IModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose} modal={false}>
      {open && (
        <div
          data-slot="dialog-overlay"
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 backdrop-blur-xs fixed inset-0 z-50 bg-black/50"
        />
      )}
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          'z-[51] w-full max-w-[400px] gap-0 space-y-10 rounded-2xl bg-white p-6 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] outline-none',
          'dark:bg-card',
        )}
      >
        <DialogTitle asChild>
          <header className="dark:text-card-foreground flex h-12 items-center justify-between text-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="flex h-12 w-12 items-center justify-center rounded-full outline-none"
            >
              <X className="h-6 w-6" />
            </button>

            <span className="dark:text-foreground text-lg font-semibold tracking-[-1px] text-gray-800">
              {title}
            </span>

            <div className="flex h-12 w-12 items-center justify-center">
              {rightAction}
            </div>
          </header>
        </DialogTitle>

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}

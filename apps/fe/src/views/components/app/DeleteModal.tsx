import { Trash2Icon } from 'lucide-react';

import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

type DeleteModalProps = {
  warn: string;
  open: boolean;
  description?: string;
  isLoading?: boolean;
  onClose(): void;
  onConfirm(): void;
};

export function DeleteModal({
  open,
  warn,
  description,
  isLoading,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  return (
    <Modal open={open} title="Excluir" onClose={onClose}>
      <div className="flex flex-col items-center gap-6">
        <div className="rounded-full bg-red-50 p-4">
          <Trash2Icon className="text-red-900" />
        </div>

        <strong className="dark:text-foreground text-center tracking-[-0.5px] text-gray-800">
          {warn}
        </strong>

        {description && (
          <p className="text-center text-base tracking-[-0.5px]">
            {description}
          </p>
        )}
      </div>

      <footer className="mt-10 flex flex-col gap-4">
        <Button
          type="button"
          variant="destructive"
          onClick={onConfirm}
          className="rounded-md"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Sim, desejo excluir
        </Button>

        <Button
          type="button"
          variant="outline"
          className="rounded-md border-gray-800 dark:border-white"
          onClick={onClose}
        >
          Cancelar
        </Button>
      </footer>
    </Modal>
  );
}

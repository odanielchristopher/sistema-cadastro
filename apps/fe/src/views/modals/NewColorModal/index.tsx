import { ColorForm } from '@views/components/app/ColorForm';
import { Modal } from '@views/components/ui/Modal';

import { useNewColorsModalController } from './useNewColorModalController';

type NewColorModalProps = {
  open: boolean;
  onClose(): void;
};

export function NewColorModal({ open, onClose }: NewColorModalProps) {
  const { handleSubmit, isLoading } = useNewColorsModalController(onClose);

  return (
    <Modal open={open} title="Nova cor" onClose={onClose}>
      <ColorForm
        submitLabel="Criar cor"
        onCancel={onClose}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}

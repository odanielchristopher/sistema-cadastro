import type { Color } from '@app/entities/Color';
import { ColorForm } from '@views/components/app/ColorForm';
import { Modal } from '@views/components/ui/Modal';

import { useEditColorModalController } from './useEditColorModalController';

type EditColorModalProps = {
  open: boolean;
  color: Color | null;
  onClose(): void;
};

export function EditColorModal({ open, color, onClose }: EditColorModalProps) {
  const { isLoading, handleSubmit } = useEditColorModalController({
    color,
    onClose,
  });

  if (!color) return null;

  return (
    <Modal open={open} title="Editar cor" onClose={onClose}>
      <ColorForm
        defaultValues={{
          name: color.name,
          hex: color.hex,
        }}
        submitLabel="Salvar alterações"
        onCancel={onClose}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}

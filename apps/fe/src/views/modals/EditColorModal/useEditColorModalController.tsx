import { toast } from 'sonner';

import type { Color } from '@app/entities/Color';
import { useUpdateColor } from '@app/hooks/useUpdateColor';
import type { ColorFormValues } from '@views/components/app/ColorForm/schema';

type UseEditColorModalControllerInput = {
  color: Color | null;
  onClose(): void;
};

export function useEditColorModalController({
  color,
  onClose,
}: UseEditColorModalControllerInput) {
  const { updateColor, isLoading } = useUpdateColor();

  async function handleSubmit(values: ColorFormValues) {
    if (!color) return;

    try {
      await updateColor({ id: color.id, ...values });
      toast.success('Cor atualizada com sucesso!');
      onClose();
    } catch {
      toast.error('Não foi possível atualizar a cor.');
    }
  }

  return {
    isLoading,
    handleSubmit,
  };
}

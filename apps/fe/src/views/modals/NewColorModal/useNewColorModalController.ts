import { toast } from 'sonner';

import { useCreateColor } from '@app/hooks/useCreateColor';
import type { ColorFormValues } from '@views/components/app/ColorForm/schema';

export function useNewColorsModalController(onClose: () => void) {
  const { createColor, isLoading } = useCreateColor();

  async function handleSubmit(values: ColorFormValues) {
    try {
      await createColor(values);
      toast.success('Cor criada com sucesso!');
      onClose();
    } catch {
      toast.error('Não foi possível criar a cor.');
    }
  }

  return {
    isLoading,
    handleSubmit,
  };
}

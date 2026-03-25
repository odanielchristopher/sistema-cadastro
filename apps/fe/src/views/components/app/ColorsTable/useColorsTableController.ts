import { useState } from 'react';
import { toast } from 'sonner';

import type { Color } from '@app/entities/Color';
import { useColors } from '@app/hooks/useColors';
import { useDeleteColor } from '@app/hooks/useDeleteColor';

export function useColorsTableController() {
  const { colors, isLoading } = useColors();
  const [colorToDelete, setColorToDelete] = useState<Color | null>(null);
  const { deleteColor, isLoading: isDeleting } = useDeleteColor(
    colorToDelete?.id,
  );

  function handleRequestDelete(color: Color) {
    setColorToDelete(color);
  }

  function handleCloseDeleteModal() {
    setColorToDelete(null);
  }

  async function handleConfirmDelete() {
    if (!colorToDelete) return;

    try {
      await deleteColor(colorToDelete.id);
      toast.success('Cor removida com sucesso!');
      setColorToDelete(null);
    } catch {
      toast.error('Não foi possível remover a cor.');
    }
  }

  const hasColors = colors.length > 0;

  return {
    colors,
    colorToDelete,
    hasColors,
    isLoading,
    isDeleting,
    handleRequestDelete,
    handleCloseDeleteModal,
    handleConfirmDelete,
  };
}

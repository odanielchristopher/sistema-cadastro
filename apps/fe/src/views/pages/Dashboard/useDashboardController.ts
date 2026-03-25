import { useState } from 'react';

import type { Color } from '@app/entities/Color';

export function useDashboardController() {
  const [isNewColorModalOpen, setIsNewColorModalOpen] = useState(false);
  const [isEditColorModalOpen, setIsEditColorModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  function openEditColorModal(color: Color) {
    setSelectedColor(color);
    setIsEditColorModalOpen(true);
  }

  function closeEditColorModal() {
    setIsEditColorModalOpen(false);
    setSelectedColor(null);
  }

  function openNewColorModal() {
    setIsNewColorModalOpen(true);
  }

  function closeNewColorModal() {
    setIsNewColorModalOpen(false);
  }

  return {
    isEditColorModalOpen,
    isNewColorModalOpen,
    selectedColor,
    openNewColorModal,
    closeNewColorModal,
    openEditColorModal,
    closeEditColorModal,
  };
}

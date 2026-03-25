import { useState } from 'react';

import type { Color } from '@app/entities/Color';

export function useDashboardController() {
  const [isNewColorModalOpen, setIsNewColorModalOpen] = useState(false);
  const [isEditColorModalOpen, setIsEditColorModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [clientsFilters, setClientsFilters] = useState({
    clientName: '',
    colorId: undefined as string | undefined,
  });

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

  function handleClientNameChange(clientName: string) {
    setClientsFilters((currentFilters) => ({
      ...currentFilters,
      clientName,
    }));
  }

  function handleColorChange(colorId?: string) {
    setClientsFilters((currentFilters) => ({
      ...currentFilters,
      colorId,
    }));
  }

  return {
    isEditColorModalOpen,
    isNewColorModalOpen,
    selectedColor,
    clientsFilters,
    openNewColorModal,
    closeNewColorModal,
    openEditColorModal,
    closeEditColorModal,
    handleClientNameChange,
    handleColorChange,
  };
}

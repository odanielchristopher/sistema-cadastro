import { InputSearch } from '@views/components/ui/InputSearch';

import { ColorDropdownInput } from '../ColorDropdownInput';

type ClientsFiltersProps = {
  clientName: string;
  colorId?: string;
  onClientNameChange(clientName: string): void;
  onColorChange(colorId?: string): void;
};

export function ClientsFilters({
  clientName,
  colorId,
  onClientNameChange,
  onColorChange,
}: ClientsFiltersProps) {
  return (
    <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <InputSearch
        placeholder="Buscar cliente pelo nome"
        value={clientName}
        onSearch={({ searchTerm }) => onClientNameChange(searchTerm)}
      />

      <ColorDropdownInput
        placeholder="Filtrar por cor"
        className="h-full"
        value={colorId}
        allowClear
        onChange={(nextColorId) => onColorChange(nextColorId || undefined)}
      />
    </div>
  );
}

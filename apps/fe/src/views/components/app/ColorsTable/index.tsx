import { PencilIcon, Trash2Icon } from 'lucide-react';

import type { Color } from '@app/entities/Color';
import { cn } from '@app/lib/utils';
import { DeleteModal } from '@views/components/app/DeleteModal';
import { Button } from '@views/components/ui/Button';
import { Spinner } from '@views/components/ui/Spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@views/components/ui/Table';

import { useColorsTableController } from './useColorsTableController';

type ColorsTableProps = {
  onEdit(color: Color): void;
};

export function ColorsTable({ onEdit }: ColorsTableProps) {
  const {
    colorToDelete,
    colors,
    handleCloseDeleteModal,
    handleConfirmDelete,
    handleRequestDelete,
    hasColors,
    isDeleting,
    isLoading,
  } = useColorsTableController();

  const deleteWarn = colorToDelete
    ? `Deseja remover a cor "${colorToDelete.name}"?`
    : 'Deseja remover esta cor?';

  const deleteDescription = colorToDelete
    ? 'Essa ação não poderá ser desfeita.'
    : undefined;

  return (
    <>
      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Preview</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="w-[140px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading && !hasColors && (
            <TableRow>
              <TableCell colSpan={4} className="py-10">
                <div className="flex items-center justify-center">
                  <Spinner className="h-8 w-8" />
                </div>
              </TableCell>
            </TableRow>
          )}

          {!isLoading && !hasColors && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-muted-foreground py-10 text-center"
              >
                Nenhuma cor cadastrada ainda.
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            hasColors &&
            colors.map((color) => (
              <TableRow key={color.id}>
                <TableCell>
                  <div
                    className={cn(
                      'h-10 w-10 rounded-full border shadow-sm',
                      'border-border',
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Preview da cor ${color.name}`}
                  />
                </TableCell>

                <TableCell className="font-medium">{color.name}</TableCell>

                <TableCell className="font-mono text-sm">{color.hex}</TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(color)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRequestDelete(color)}
                      disabled={isDeleting}
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <DeleteModal
        open={Boolean(colorToDelete)}
        warn={deleteWarn}
        description={deleteDescription}
        isLoading={isDeleting}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

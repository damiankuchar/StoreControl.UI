import { flexRender, Table } from "@tanstack/react-table";
import { memo } from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

interface DataTableBodyProps<TData> {
  table: Table<TData>;
}

export const DataTableBody = <TData,>({ table }: DataTableBodyProps<TData>) => {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} style={{ width: `calc(var(--col-${cell.column.id}-size) * 1px)` }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export const MemorizedDataTableBody = memo(
  DataTableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof DataTableBody;
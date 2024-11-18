import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";
import { Checkbox } from "../checkbox";

interface DataTableBodyProps<TData> {
  table: Table<TData>;
  checkboxSelection?: boolean;
}

export const DataTableBody = <TData,>({ table, checkboxSelection }: DataTableBodyProps<TData>) => {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {checkboxSelection ? (
              <TableCell style={{ width: "40px" }}>
                <Checkbox
                  checked={row.getIsSelected()}
                  onCheckedChange={(value) => row.toggleSelected(!!value)}
                  aria-label="Select row"
                  className="translate-y-0.5"
                />
              </TableCell>
            ) : null}
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                style={{
                  width: cell.column.getSize() === Number.MAX_SAFE_INTEGER ? "auto" : cell.column.getSize(),
                }}
              >
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

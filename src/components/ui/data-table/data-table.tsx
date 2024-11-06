import { cn } from "@/lib/utils";
import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import { TableHeader, TableRow, TableHead, Table } from "../table";
import DataTablePagination from "./data-table-pagination";
import DataTableColumnResizer from "./data-table-column-resizer";
import { useMemo } from "react";
import { DataTableBody, MemorizedDataTableBody } from "./data-table-body";

interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: TanstackTable<TData>;
}

const DataTable = <TData,>({ table, children, className, ...props }: DataTableProps<TData>) => {
  const columnSizingInfo = table.getState().columnSizingInfo;
  const columnSizing = table.getState().columnSizing;

  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }

    return colSizes;
    // Recalculating column sizes on change of table sizing state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, columnSizingInfo, columnSizing]);

  return (
    <div className={cn("w-full space-y-2.5 overflow-auto", className)} {...props}>
      {children}
      <div className="overflow-hidden rounded-md border">
        <Table style={{ ...columnSizeVars }}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent cursor-pointer">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="relative"
                      style={{ width: `calc(var(--header-${header?.id}-size) * 1px)` }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      <DataTableColumnResizer header={header} />
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {table.getState().columnSizingInfo.isResizingColumn ? (
            <MemorizedDataTableBody table={table} />
          ) : (
            <DataTableBody table={table} />
          )}
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export default DataTable;

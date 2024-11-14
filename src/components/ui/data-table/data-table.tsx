import { cn } from "@/lib/utils";
import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import { Table, TableHead, TableHeader, TableRow } from "../table";
import { DataTableBody } from "./data-table-body";
import DataTablePagination from "./data-table-pagination";

interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: TanstackTable<TData>;
  pagination?: boolean;
}

const DataTable = <TData,>({ table, pagination = true, children, className, ...props }: DataTableProps<TData>) => {
  return (
    <div className={cn("w-full space-y-2.5 overflow-auto", className)} {...props}>
      {children}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent cursor-pointer">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="relative"
                      style={{ width: header.getSize() === Number.MAX_SAFE_INTEGER ? "auto" : header.getSize() }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <DataTableBody table={table} />
        </Table>
      </div>
      {pagination ? (
        <div className="flex flex-col gap-2.5">
          <DataTablePagination table={table} />
        </div>
      ) : null}
    </div>
  );
};

export default DataTable;

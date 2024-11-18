import { Table } from "@tanstack/react-table";
import { Checkbox } from "../checkbox";
import { TableHead, TableHeader, TableRow } from "../table";
import DataTableColumnHeader from "./data-table-column-header";

interface DataTableHeadProps<TData> {
  table: Table<TData>;
  checkboxSelection?: boolean;
}

const DataTableHead = <TData,>({ table, checkboxSelection }: DataTableHeadProps<TData>) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="hover:bg-transparent cursor-pointer">
          {checkboxSelection ? (
            <TableHead style={{ width: "40px" }}>
              <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-0.5"
              />
            </TableHead>
          ) : null}
          {headerGroup.headers.map((header) => {
            return (
              <TableHead
                key={header.id}
                className="relative"
                style={{ width: header.getSize() === Number.MAX_SAFE_INTEGER ? "auto" : header.getSize() }}
              >
                <DataTableColumnHeader header={header} title={header.id} />
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default DataTableHead;

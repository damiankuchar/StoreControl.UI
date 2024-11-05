import { Row, Table } from "@tanstack/react-table";
import { Checkbox } from "../checkbox";

interface DataTableHeaderCheckboxProps<TData> {
  table: Table<TData>;
}

const DataTableHeaderCheckbox = <TData,>({ table }: DataTableHeaderCheckboxProps<TData>) => {
  return (
    <Checkbox
      checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="translate-y-0.5"
    />
  );
};

interface DataTableCellCheckboxProps<TData> {
  row: Row<TData>;
}

const DataTableCellCheckbox = <TData,>({ row }: DataTableCellCheckboxProps<TData>) => {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      className="translate-y-0.5"
    />
  );
};

export { DataTableHeaderCheckbox, DataTableCellCheckbox };

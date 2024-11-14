import { DataTableCellCheckbox, DataTableHeaderCheckbox } from "@/components/ui/data-table/data-table-checkbox";
import DataTableColumnHeader from "@/components/ui/data-table/data-table-column-header";
import { PermissionDto } from "@/models/permission-models";
import { ColumnDef } from "@tanstack/react-table";
import ColumnsActions from "./column-actions";

export const columns: ColumnDef<PermissionDto>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableCellCheckbox row={row} />,
    enableResizing: false,
    size: 40,
  },
  {
    id: "no",
    accessorFn: (_, index) => index + 1,
    header: ({ column }) => <DataTableColumnHeader column={column} title="No." className="font-bold" />,
    cell: ({ row }) => {
      return <div className="font-semibold">{row.index + 1}</div>;
    },
    enableGlobalFilter: false,
    size: 70,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnsActions row={row} />,
    enableResizing: false,
    size: 150,
  },
];

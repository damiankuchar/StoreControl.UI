import { DataTableCellCheckbox, DataTableHeaderCheckbox } from "@/components/ui/data-table/data-table-checkbox";
import DataTableColumnHeader from "@/components/ui/data-table/data-table-column-header";
import { UserDto } from "@/models/user-models";
import { ColumnDef } from "@tanstack/react-table";
import ColumnsActions from "./columns-actions";

export const columns: ColumnDef<UserDto>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableCellCheckbox row={row} />,
    enableResizing: false,
    size: 1,
  },
  {
    id: "no",
    accessorFn: (_, index) => index + 1,
    header: ({ column }) => <DataTableColumnHeader column={column} title="No." className="font-bold" />,
    cell: ({ row }) => {
      return <div className="font-semibold">{row.index + 1}</div>;
    },
    enableGlobalFilter: false,
    size: 1,
  },
  {
    accessorKey: "username",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="First Name" />,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Name" />,
  },
  {
    accessorKey: "registrationDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Registration Date" />,
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnsActions row={row} />,
    enableResizing: false,
    size: 1,
  },
];

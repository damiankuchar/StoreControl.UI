import { RoleDto } from "@/models/role-models";
import { ColumnDef } from "@tanstack/react-table";
import ColumnActions from "./column-actions";

export const columns: ColumnDef<RoleDto>[] = [
  {
    id: "no",
    accessorFn: (_, index) => index + 1,
    header: "No.",
    cell: ({ row }) => {
      return <div className="font-semibold">{row.index + 1}</div>;
    },
    enableGlobalFilter: false,
    size: 70,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnActions row={row} />,
    enableResizing: false,
    size: 150,
  },
];

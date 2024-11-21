import { PermissionDto } from "@/models/permission-models";
import { ColumnDef } from "@tanstack/react-table";
import ColumnsActions from "./column-actions";

export const columns: ColumnDef<PermissionDto>[] = [
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
    size: 300,
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnsActions row={row} />,
    enableResizing: false,
    size: 150,
  },
];

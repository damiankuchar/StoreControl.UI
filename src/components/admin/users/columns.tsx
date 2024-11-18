import { UserDto } from "@/models/user-models";
import { ColumnDef } from "@tanstack/react-table";
import ColumnsActions from "./columns-actions";

export const columns: ColumnDef<UserDto>[] = [
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
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "registrationDate",
    header: "Registration Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnsActions row={row} />,
    enableResizing: false,
    size: 150,
  },
];

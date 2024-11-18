import { cn } from "@/lib/utils";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import { ReactNode, useState } from "react";
import { Table } from "../table";
import { DataTableBody } from "./data-table-body";
import DataTableHead from "./data-table-head";
import DataTablePagination from "./data-table-pagination";
import DataTableToolbar from "./data-table-toolbar";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  children: ReactNode;
  rowSelectionState?: RowSelectionState;
  checkboxSelection?: boolean;
  pagination?: boolean;
  exporting?: boolean;
  getRowId?: (row: TData) => string;
  onRowSelectionChange?: (row: Updater<RowSelectionState>) => void;
}

const DataTable = <TData,>({
  columns,
  data,
  rowSelectionState,
  checkboxSelection = true,
  pagination = true,
  exporting = true,
  getRowId,
  onRowSelectionChange,
  children,
}: DataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [internalRowSelection, setInternalRowSelection] = useState<RowSelectionState>(rowSelectionState ?? {});

  const rowSelection = rowSelectionState ?? internalRowSelection;

  const handleRowSelectionChange = (rowSelection: Updater<RowSelectionState>) => {
    if (onRowSelectionChange) {
      onRowSelectionChange(rowSelection);
    } else {
      setInternalRowSelection(rowSelection);
    }
  };

  const defaultGetRowId = (row: TData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rowEntity = row as any;

    return rowEntity?.id ?? rowEntity.index;
  };

  const getRowIdFn = getRowId ?? defaultGetRowId;

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: (row) => handleRowSelectionChange(row),
    getRowId: getRowIdFn,
    initialState: {
      rowSelection: rowSelection,
    },
    state: {
      rowSelection: rowSelection,
      sorting,
    },
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
  });

  return (
    <div className={cn("w-full space-y-2.5 overflow-auto")}>
      {/* Temp solution - toolbar and other elements should be implemented using slots */}
      <DataTableToolbar table={table} exporting={exporting}>
        {children}
      </DataTableToolbar>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <DataTableHead table={table} checkboxSelection={checkboxSelection} />
          <DataTableBody table={table} checkboxSelection={checkboxSelection} />
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

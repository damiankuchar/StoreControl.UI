import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { Input } from "../input";
import { DownloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";
import { toast } from "sonner";

interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  exporting?: boolean | null;
}

const DataTableToolbar = <TData,>({
  table,
  exporting,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) => {
  return (
    <div className={cn("flex w-full items-center justify-between gap-2 overflow-auto p-1", className)} {...props}>
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Search..."
          value={table.getState().globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          className="h-8 w-40 lg:w-64"
        />
      </div>
      <div className="flex items-center gap-2">
        {children}
        {exporting ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.info("Export not implemented yet ¯\\_(ツ)_/¯");
            }}
            className="gap-2"
          >
            <DownloadIcon className="size-4" aria-hidden="true" />
            Export
          </Button>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
};

export default DataTableToolbar;

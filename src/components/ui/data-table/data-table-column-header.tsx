import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CaretSortIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { flexRender, Header } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import React from "react";

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  header: Header<TData, TValue>;
}

const DataTableColumnHeader = <TData, TValue>({ header, className }: DataTableColumnHeaderProps<TData, TValue>) => {
  if (!header.column.getCanSort()) {
    return <div className={cn(className)}>{flexRender(header.column.columnDef.header, header.getContext())}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</span>
            {header.column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-3 w-3" />
            ) : header.column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-3 w-3" />
            ) : (
              <CaretSortIcon className="ml-2 h-3 w-3" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() =>
              header.column.getIsSorted() === "asc" ? header.column.clearSorting() : header.column.toggleSorting(false)
            }
          >
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              header.column.getIsSorted() === "desc" ? header.column.clearSorting() : header.column.toggleSorting(true)
            }
          >
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => header.column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DataTableColumnHeader;

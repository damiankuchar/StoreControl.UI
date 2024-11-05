import { Table } from "@tanstack/react-table";
import { CaretSortIcon, CheckIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { toSentenceCase, cn } from "@/lib/utils";
import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../command";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-label="Toggle columns"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size="sm"
          className="ml-auto hidden h-8 gap-2 lg:flex"
        >
          <MixerHorizontalIcon className="size-4" />
          View
          <CaretSortIcon className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44 p-0">
        <Command>
          <CommandInput placeholder="Search columns..." />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                .map((column) => {
                  return (
                    <CommandItem key={column.id} onSelect={() => column.toggleVisibility(!column.getIsVisible())}>
                      <span className="truncate">{toSentenceCase(column.id)}</span>
                      <CheckIcon
                        className={cn("ml-auto size-4 shrink-0", column.getIsVisible() ? "opacity-100" : "opacity-0")}
                      />
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

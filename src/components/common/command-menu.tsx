import { useProductionLines } from "@/hooks/queries/production-line-queries";
import { ProductionLineDto } from "@/models/production-line-models";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { useCanvasStore } from "@/stores/canvas-store";

const CommandMenu = () => {
  const setSelectedProductionLine = useCanvasStore((state) => state.setSelectedProductionLine);
  const [open, setOpen] = useState(false);

  const { data: productionLines } = useProductionLines();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (productionLines) {
      setSelectedProductionLine(productionLines[0]);
    }
  }, [productionLines, setSelectedProductionLine]);

  const runCommand = (productionLine: ProductionLineDto) => {
    setOpen(false);
    setSelectedProductionLine(productionLine);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search production line...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Production Lines">
            {productionLines?.map((productionLine, index) => (
              <CommandItem key={index} onSelect={() => runCommand(productionLine)}>
                <span>{productionLine.id}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandMenu;
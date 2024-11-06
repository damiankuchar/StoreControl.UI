import { cn } from "@/lib/utils";
import { Header } from "@tanstack/react-table";

interface DataTableColumnResizerProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  header: Header<TData, TValue>;
}

const DataTableColumnResizer = <TData, TValue>({ header, className }: DataTableColumnResizerProps<TData, TValue>) => {
  if (!header.column.getCanResize()) {
    return <></>;
  }

  return (
    <div
      className={cn(
        "absolute top-0 bottom-0 right-1 m-auto cursor-col-resize w-[2.5px] h-1/2 rounded-sm bg-border hover:bg-foreground transition-colors duration-150 select-none touch-none",
        className,
        header.column.getIsResizing() ? "bg-foreground" : "",
      )}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      onDoubleClick={() => header.column.resetSize()}
    />
  );
};

export default DataTableColumnResizer;

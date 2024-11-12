import { useThemeStore } from "@/stores/theme-store";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Sonner
      className="pointer-events-auto"
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        classNames: {
          closeButton: "-right-1 top-2 left-auto",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

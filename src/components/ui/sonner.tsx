import { rootStore } from "@/stores/root-store";
import { observer } from "mobx-react-lite";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = observer(({ ...props }: ToasterProps) => {
  const { themeStore } = rootStore;

  return (
    <Sonner
      className="pointer-events-auto"
      theme={themeStore.theme as ToasterProps["theme"]}
      toastOptions={{
        classNames: {
          closeButton: "-right-1 top-2 left-auto",
        },
      }}
      {...props}
    />
  );
});

export { Toaster };

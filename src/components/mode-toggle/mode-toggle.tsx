import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { rootStore } from "@/stores/root-store";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const ModeToggle = () => {
  const { themeStore } = rootStore;

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="rounded-full w-8 h-8"
            variant="ghost"
            size="icon"
            onClick={() => themeStore.setTheme(themeStore.theme === "dark" ? "light" : "dark")}
          >
            <MoonIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
            <SunIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">Switch Theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Switch Theme</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ModeToggle;

import ModeToggle from "../mode-toggle/mode-toggle";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const CanvasHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background overflow-auto">
      <div className="flex h-14 items-center w-full mx-auto px-5">
        <div className="flex items-center space-x-5">
          <SidebarTrigger className="w-5 h-5" />
          <Button variant="ghost">
            <Link to="/">StoreControl.UI</Link>
          </Button>
        </div>
        <div className="flex-1 flex justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <h1 className="text-3xl leading-none whitespace-nowrap">PRODUCTION LINE 1</h1>
        </div>
        <div className="flex items-center justify-end lg:flex-1">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default CanvasHeader;

import ModeToggle from "../mode-toggle/mode-toggle";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-14 items-center space-x-5 w-full mx-auto px-5">
        <SidebarTrigger className="w-5 h-5" />
        <Button variant="ghost">
          <Link to="/">StoreControl.UI</Link>
        </Button>
        <div className="flex flex-1 space-x-2 justify-end">
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

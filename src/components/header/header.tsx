import ModeToggle from "../mode-toggle/mode-toggle";
import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-14 items-center space-x-4 sm:justify-between sm:space-x-0 w-full mx-auto px-5">
        <SidebarTrigger className="w-5 h-5" />
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

import Header from "../header/header";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../app-sidebar/app-sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex-1 mx-auto p-4 w-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;

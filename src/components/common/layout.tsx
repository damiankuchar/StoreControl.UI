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
        <div className="flex-1 container my-5">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;

import Header from "../header/header";
import { SIDEBAR_COOKIE_NAME, SidebarInset, SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../app-sidebar/app-sidebar";
import { getCookie } from "@/lib/cookie";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const defaultOpen = getCookie(SIDEBAR_COOKIE_NAME) === "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <Header />
        <div className="flex-1 flex flex-col mx-auto p-6 w-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;

import { getCookie } from "@/lib/cookie";
import AppSidebar from "../app-sidebar/app-sidebar";
import Header from "../header/header";
import { SIDEBAR_COOKIE_NAME, SidebarInset, SidebarProvider } from "../ui/sidebar";

interface LayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const Layout = ({ header, children }: LayoutProps) => {
  const defaultOpen = getCookie(SIDEBAR_COOKIE_NAME) === "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        {header ? header : <Header />}
        <div className="flex-1 flex flex-col mx-auto p-6 w-full space-y-3">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;

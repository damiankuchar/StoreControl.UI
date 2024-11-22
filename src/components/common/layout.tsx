import { getCookie } from "@/lib/cookie";
import AppSidebar from "../app-sidebar/app-sidebar";
import Header from "../header/header";
import { SIDEBAR_COOKIE_NAME, SidebarInset, SidebarProvider } from "../ui/sidebar";
import BreadcrumbNavigation from "./breadcrumb-navigation";

interface LayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  breadcrumbs?: string[];
}

const Layout = ({ header, children, breadcrumbs }: LayoutProps) => {
  const defaultOpen = getCookie(SIDEBAR_COOKIE_NAME) === "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        {header ? header : <Header />}
        <div className="flex-1 flex flex-col mx-auto p-6 w-full space-y-3">
          <BreadcrumbNavigation breadcrumbs={breadcrumbs} />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;

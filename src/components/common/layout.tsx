import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../sidebar/app-sidebar";

const Layout = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div ref={ref} className={className} {...props} />
    </SidebarProvider>
  ),
);

export default Layout;

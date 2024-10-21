import { Sidebar } from "../ui/sidebar";
import AppSidebarHeader from "./app-sidebar-header";
import AppSidebarContent from "./app-sidebar-content";
import AppSidebarFooter from "./app-sidebar-footer";

const AppSidebar = () => {
  return (
    <Sidebar variant="sidebar">
      <AppSidebarHeader />
      <AppSidebarContent />
      <AppSidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;

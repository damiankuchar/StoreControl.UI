import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "../ui/sidebar";
import SidebarCollapsibleItem, { CollapsibleNavGroup } from "./sidebar-groups/sidebar-collapsible-item";
import SidebarSimpleItem, { SimpleNavGroup } from "./sidebar-groups/sidebar-simple-item";
import SidebarDropdownItem, { DropdownNavGroup } from "./sidebar-groups/sidebar-dropdown-item";
import { NavGroup } from "@/stores/sidebar-store";
import { rootStore } from "@/stores/root-store";

const isSimpleNavGroup = (navGroup: NavGroup): navGroup is SimpleNavGroup => {
  return navGroup.type === "simple";
};

const isDropdownNavGroup = (navGroup: NavGroup): navGroup is DropdownNavGroup => {
  return navGroup.type === "dropdown";
};

const isCollapsibleNavGroup = (navGroup: NavGroup): navGroup is CollapsibleNavGroup => {
  return navGroup.type === "collapsible";
};

const renderSidebarItem = (data: NavGroup[]) => {
  return data.map((item) => {
    if (isSimpleNavGroup(item)) {
      return <SidebarSimpleItem key={item.title} item={item} />;
    } else if (isDropdownNavGroup(item)) {
      return <SidebarDropdownItem key={item.title} item={item} />;
    } else if (isCollapsibleNavGroup(item)) {
      return <SidebarCollapsibleItem key={item.title} item={item} />;
    }
  });
};

const AppSidebarContent = () => {
  const { sidebarStore } = rootStore;

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Admin</SidebarGroupLabel>
        {renderSidebarItem(sidebarStore.data)}
      </SidebarGroup>
    </SidebarContent>
  );
};

export default AppSidebarContent;

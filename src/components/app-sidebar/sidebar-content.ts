import { Users } from "lucide-react";
import { CollapsibleNavGroup } from "./sidebar-groups/sidebar-collapsible-item";
import { DropdownNavGroup } from "./sidebar-groups/sidebar-dropdown-item";
import { SimpleNavGroup } from "./sidebar-groups/sidebar-simple-item";

export type NavGroup = SimpleNavGroup | DropdownNavGroup | CollapsibleNavGroup;

export const sidebarData: NavGroup[] = [
  {
    type: "collapsible",
    title: "Users",
    icon: Users,
    isActive: true,
    items: [
      {
        title: "Manage users",
        url: "admin/users",
      },
      {
        title: "Manage roles",
        url: "admin/roles",
      },
    ],
  } as CollapsibleNavGroup,
];

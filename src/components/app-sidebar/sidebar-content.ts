import { Users } from "lucide-react";
import { CollapsibleNavGroup } from "./sidebar-groups/sidebar-collapsible-item";
import { DropdownNavGroup } from "./sidebar-groups/sidebar-dropdown-item";
import { SimpleNavGroup } from "./sidebar-groups/sidebar-simple-item";
import { Read_All_Permissions, Read_All_Roles, Read_All_Users } from "@/lib/permissions";

export type NavGroup = SimpleNavGroup | DropdownNavGroup | CollapsibleNavGroup;

export const sidebarData: NavGroup[] = [
  {
    type: "collapsible",
    title: "Users",
    icon: Users,
    isActive: true,
    permissions: [Read_All_Users, Read_All_Roles, Read_All_Permissions],
    items: [
      {
        title: "Manage users",
        url: "admin/users",
        permissions: [Read_All_Users],
      },
      {
        title: "Manage roles",
        url: "admin/roles",
        permissions: [Read_All_Roles],
      },
    ],
  } as CollapsibleNavGroup,
];

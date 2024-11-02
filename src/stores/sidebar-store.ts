import { CollapsibleNavGroup } from "@/components/app-sidebar/sidebar-groups/sidebar-collapsible-item";
import { DropdownNavGroup } from "@/components/app-sidebar/sidebar-groups/sidebar-dropdown-item";
import { SimpleNavGroup } from "@/components/app-sidebar/sidebar-groups/sidebar-simple-item";
import { Users } from "lucide-react";
import { makeAutoObservable } from "mobx";

export type NavGroup = SimpleNavGroup | DropdownNavGroup | CollapsibleNavGroup;

const createInitialNavData = (): NavGroup[] => {
  return [
    {
      type: "collapsible",
      title: "Users",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Register user",
          url: "/admin/register-user",
        },
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
};

export class SidebarStore {
  data: NavGroup[] = createInitialNavData();

  constructor() {
    makeAutoObservable(this);
  }
}

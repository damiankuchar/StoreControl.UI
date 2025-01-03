import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction } from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/auth-store";
import { LucideProps, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

interface DropdownNavItem {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  permissions?: string[];
}

export interface DropdownNavGroup {
  type: "dropdown";
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  permissions?: string[];
  dropdownItems: DropdownNavItem[];
}

interface SidebarDropdownItemProps {
  item: DropdownNavGroup;
}

const SidebarDropdownItem = ({ item }: SidebarDropdownItemProps) => {
  const hasPermissions = useAuthStore((state) => state.hasPermissions);

  if (!hasPermissions(item.permissions)) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <Link to={item.url}>
            <item.icon />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction showOnHover={false}>
              <MoreHorizontal />
              <span className="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 rounded-lg" side="bottom" align="end">
            {item.dropdownItems.map((dropdownItem) => {
              if (!hasPermissions(dropdownItem.permissions)) {
                return null;
              }

              return (
                <DropdownMenuItem key={dropdownItem.title}>
                  <span className="text-muted-foreground">
                    <dropdownItem.icon />
                  </span>
                  <span>{dropdownItem.title}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarDropdownItem;

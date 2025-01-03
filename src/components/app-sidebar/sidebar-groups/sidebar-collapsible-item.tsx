import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/auth-store";
import { ChevronRight, Dot, LucideProps } from "lucide-react";
import { Link } from "react-router-dom";

interface CollapsibleNavItem {
  title: string;
  url: string;
  permissions?: string[];
}

export interface CollapsibleNavGroup {
  type: "collapsible";
  title: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  isActive: boolean;
  permissions?: string[];
  items: CollapsibleNavItem[];
}

interface SidebarCollapsibleItemProps {
  item: CollapsibleNavGroup;
}

const SidebarCollapsibleItem = ({ item }: SidebarCollapsibleItemProps) => {
  const hasPermissions = useAuthStore((state) => state.hasPermissions);

  if (!hasPermissions(item.permissions)) {
    return null;
  }

  return (
    <SidebarMenu>
      <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title}>
              <item.icon />
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items?.map((subItem) => {
                if (!hasPermissions(subItem.permissions)) {
                  return null;
                }

                return (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild>
                      <Link to={subItem.url}>
                        <Dot />
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
};

export default SidebarCollapsibleItem;

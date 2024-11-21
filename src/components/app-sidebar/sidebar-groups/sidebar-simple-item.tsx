import { SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/auth-store";
import { LucideProps } from "lucide-react";
import { Link } from "react-router-dom";

export interface SimpleNavGroup {
  type: "simple";
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  permissions?: string[];
}

interface SidebarSimpleItemProps {
  item: SimpleNavGroup;
}

const SidebarSimpleItem = ({ item }: SidebarSimpleItemProps) => {
  const hasPermissions = useAuthStore((state) => state.hasPermissions);

  if (!hasPermissions(item.permissions)) {
    return null;
  }

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link to={item.url}>
              <item.icon />
              {item.title}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  );
};

export default SidebarSimpleItem;

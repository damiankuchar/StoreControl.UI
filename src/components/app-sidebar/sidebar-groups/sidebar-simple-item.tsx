import { SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LucideProps } from "lucide-react";
import { Link } from "react-router-dom";

export interface SimpleNavGroup {
  type: "simple";
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

interface SidebarSimpleItemProps {
  item: SimpleNavGroup;
}

const SidebarSimpleItem = ({ item }: SidebarSimpleItemProps) => {
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

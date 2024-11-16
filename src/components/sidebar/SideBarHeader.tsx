import { HamIcon } from "lucide-react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";

export const SideBarHeader = () => {
  return (
    <>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className=" p-9 pointer-events-none select-none">
              <div>
                <HamIcon />
                <div className="flex flex-col">
                  <span>Hack-header</span>
                  <span>hello team</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </>
  );
};

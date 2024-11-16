import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import { UserButton, useUser } from "@clerk/clerk-react";

const SideBarFooter = () => {
  const { user } = useUser(); // Clerk hook for client-side user fetching

  return (
    <>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-none">
              <div className="flex items-center justify-between">
                <UserButton />
                <span>{user?.username}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
};

export default SideBarFooter;

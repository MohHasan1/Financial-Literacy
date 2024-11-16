import { Navigate, Outlet } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import SideBar from "../sidebar/SideBar";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export const PrivateLayout = () => {
  return (
    <>
      <SignedIn>
        <SidebarProvider>
          <header>
            <SideBar />
          </header>
          <main>
            <SidebarTrigger />
            <Outlet />
          </main>
          <footer></footer>
        </SidebarProvider>
      </SignedIn>

      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  );
};

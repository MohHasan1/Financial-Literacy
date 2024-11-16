import { Sidebar } from "../ui/sidebar";
import SideBarContent from "./SideBarContent";
import SideBarFooter from "./SideBarFooter";
import { SideBarHeader } from "./SideBarHeader";

const SideBar = () => {
  return (
    <>
      <Sidebar collapsible="icon">
        <SideBarHeader />
        <SideBarContent />
        <SideBarFooter />
      </Sidebar>
    </>
  );
};

export default SideBar;

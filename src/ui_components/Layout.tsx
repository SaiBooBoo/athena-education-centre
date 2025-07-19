import { useState, type ReactNode } from "react";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import Sidebar from "./SideBarComponent";

interface LayoutProps {
  children: ReactNode;
}



export default function Layout({ children }: LayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : 'light'}`}>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isExpanded={isSidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <HeaderComponent 
            isSidebarExpanded={isSidebarExpanded}
            toggleSidebar={toggleSidebar}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          
          <main className={`flex-1 overflow-y-auto transition-all duration-300
            ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
            {children}
          </main>
        </div>
      </div>
      
      <FooterComponent />
    </div>
  );
}

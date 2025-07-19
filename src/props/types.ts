export interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

export interface HeaderComponentProps {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}
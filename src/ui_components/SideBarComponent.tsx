
import { useState, useEffect } from "react";
import { Link, useLocation} from "react-router-dom";
import { 
  FiUser, FiUsers, FiUserCheck, FiBookOpen, 
  FiCalendar, FiBook, 
  FiSettings, FiHelpCircle, FiGrid, FiClipboard,
  FiHome,
  FiFileText,
  FiUserPlus,
  FiBarChart2,
  FiClock,
  FiLayers
} from "react-icons/fi";


export default function Sidebar({ isExpanded, onMouseEnter, onMouseLeave }) {
  const [darkMode, setDarkMode] = useState(true);
  const [activePath, setActivePath] = useState("");
  const location = useLocation();
  
  // Sync with header's theme
  useEffect(() => {
    const isDark = document.body.classList.contains('dark');
    setDarkMode(isDark);
    
    const observer = new MutationObserver(() => {
      setDarkMode(document.body.classList.contains('dark'));
    });
    
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Track active path
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const menuItems = [
    { 
      title: "Search",
      items: [
        { name: "Admin", icon: <FiUser size={18} />, path: "/adminDashboard" },
        { name: "Students", icon: <FiUsers size={18} />, path: "/studentDashboard" },
        { name: "Parents", icon: <FiUserCheck size={18} />, path: "/parentDashboard" },
        { name: "Teachers", icon: <FiBookOpen size={18} />, path: "/teacherDashboard" }
      ]
    },
    {
      title: "MANAGEMENT",
      items: [
        { name: "Classes", icon: <FiLayers size={18} />, path: "/classes" },
        { name: "Subjects", icon: <FiBook size={18} />, path: "/subjects" },
        { name: "Attendance", icon: <FiClock size={18} />, path: "/attendance" },
        { name: "Timetable", icon: <FiCalendar size={18} />, path: "/timetable" },
        { name: "Student Promotion", icon: <FiBarChart2 size={18} />, path: "/studentPromotion" }
      ]
    },
    {
      title: "REGISTRATION FORM",
      items: [
        { name: "Student Form", icon: <FiFileText size={18} />, path: "/registerStudent" },
        { name: "Parent Form", icon: <FiUserPlus size={18} />, path: "/registerParent" },
        { name: "Teacher Form", icon: <FiClipboard size={18} />, path: "/registerTeacher" }
      ]
    },
    {
      title: "SUPPORT",
      items: [
        { name: "Settings", icon: <FiSettings size={18} />, path: "/settings" },
        { name: "Help Center", icon: <FiHelpCircle size={18} />, path: "/help" }
      ]
    }
  ];

  // Mobile navigation items
  const mobileNavItems = [
    { name: "Home", icon: <FiHome size={18} />, path: "/" },
    { name: "Students", icon: <FiUsers size={18} />, path: "/students" },
    { name: "Classes", icon: <FiGrid size={18} />, path: "/classes" },
    { name: "Attendance", icon: <FiClock size={18} />, path: "/attendance" },
    { name: "Settings", icon: <FiSettings size={18} />, path: "/settings" }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div 
      className={`sidebar fixed top-0 left-0 h-full transition-all duration-300 ease-in-out z-50
    ${isExpanded ? "w-64" : "w-20"} shadow-2xl overflow-hidden flex flex-col
    bg-[var(--bg)] text-[var(--text)] border-r border-[var(--border)]`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Logo/Title Section */}
        <div className={`flex items-center p-5 border-b border-[var(--border-muted)] 
                        ${isExpanded ? "justify-start" : "justify-center"}`}>
          <div className={`flex items-center justify-center rounded-lg p-2 
                          bg-[var(--primary)] text-[var(--bg)]`}>
            {!isExpanded && <span className="text-xl font-bold">_A_ </span>}
            {isExpanded && <span className="text-xl font-bold">ALC</span>}
          </div>
          {isExpanded && (
            <div className="ml-3">
              <h1 className="text-xl font-bold whitespace-nowrap">
                <span className="text-[var(--primary)]">Athena</span> Learning
              </h1>
              <p className="text-[var(--text-muted)] text-xs mt-1">School Management System</p>
            </div>
          )}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-[var(--border)] scrollbar-track-[var(--bg-light)]">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-8">
              <div className="px-4 py-2 text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider">
                {isExpanded ? section.title : <div className="h-4"></div>}
              </div>
              
              {section.items.map((item, idx) => (
                <Link 
                  key={idx}
                  to={item.path} 
                  className={`flex items-center px-4 py-3 transition-colors
                    hover:bg-[var(--bg-light)] hover:text-[var(--primary)] 
                    ${activePath === item.path ? 'bg-[var(--highlight)]' : ''}`}
                >
                  <div className={`p-2 rounded-lg transition-colors
                    ${activePath === item.path ? 
                      'bg-[var(--primary)] text-[var(--bg)]' : 
                      'bg-[var(--bg-light)] text-[var(--text)]'}`}>
                    {item.icon}
                  </div>
                  {isExpanded && (
                    <span className="ml-4 font-medium">{item.name}</span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg)] border-t border-[var(--border)] shadow-lg">
        <div className="flex justify-around items-center">
          {mobileNavItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center py-3 px-4 w-full transition-colors ${
                activePath === item.path 
                  ? 'text-[var(--primary)] bg-[var(--bg-light)]' 
                  : 'text-[var(--text-muted)]'
              }`}
            >
              <div className="text-xl mb-1">
                {item.icon}
              </div>
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
import { useState, useEffect } from "react";
import { 
  FiSun, FiMoon, FiBell, FiMessageSquare, 
  FiChevronDown, FiSearch, FiCalendar, FiX, FiMenu
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import type { HeaderComponentProps } from "../props/HeaderCoponentProps";
import { fetchAccountType, useAuth } from "../service/AuthService";
import { Link } from "react-router-dom";


export default function HeaderComponent({ isSidebarExpanded, toggleSidebar }: HeaderComponentProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [showAcademicDropdown, setShowAcademicDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [academicYear, setAcademicYear] = useState("2024/2025");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [accountType, setAccountType] = useState<string | null>(null);
  const {username} = useAuth();


  function capitalizeFirstLetter(name: string): string {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

 useEffect(() => {
  if(username) {
    fetchAccountType(username)
    .then(setAccountType)
    .catch(() => setAccountType("UNKNOWN"))
  }
 }, [username])

  // Apply theme class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [darkMode]);

  const academicYears = ["2024/2025", "2023/2024", "2022/2023", "2021/2022"];
  const profileOptions = ["My Profile", "Settings"];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowAcademicDropdown(false);
      setShowProfileDropdown(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if(loading || error) {
    return {
      loading: true,
      error: "Loading..."
    }
  }

  return (
    <nav 
      className={`sticky top-0 z-50 bg-[var(--bg)] text-[var(--text)] shadow-lg 
                 transition-all duration-300 ease-in-out
                 ${isSidebarExpanded ? '' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Sidebar Toggle for Mobile */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-[var(--bg-light)] mr-2"
            >
              <FiMenu size={24} className="text-[var(--text)]" />
            </button>
          </div>

          {/* Left Section - Search Bar */}
          <div className="flex items-center w-1/3">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="text-[var(--text-muted)]" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--bg-light)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Academic Year Section */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-[var(--text-muted)]">
                <FiCalendar className="mr-1" />
                <span>Academic Year</span>
              </div>
              
              {/* Academic Year Dropdown */}
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAcademicDropdown(!showAcademicDropdown);
                  }}
                  className="flex items-center hover:text-[var(--primary)] transition-colors px-2 py-1 rounded border border-[var(--border)] bg-[var(--bg-light)]"
                >
                  {academicYear}
                  <FiChevronDown className="ml-1" />
                </button>
                
                {showAcademicDropdown && (
                  <div 
                    className="absolute z-10 mt-2 w-40 rounded-md shadow-lg bg-[var(--bg-light)] border border-[var(--border)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {academicYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          setAcademicYear(year);
                          setShowAcademicDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-[var(--highlight)] ${
                          year === academicYear ? 'text-[var(--primary)]' : ''
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-[var(--bg-light)] hover:text-[var(--primary)] transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Notification */}
            <button className="p-2 rounded-full relative hover:bg-[var(--bg-light)] hover:text-[var(--primary)] transition-colors">
              <FiBell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--danger)] rounded-full"></span>
            </button>

            {/* Chatbox */}
            <button className="p-2 rounded-full hover:bg-[var(--bg-light)] hover:text-[var(--primary)] transition-colors">
              <FiMessageSquare size={20} />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileDropdown(!showProfileDropdown);
                }}
                className="flex items-center space-x-1 hover:text-[var(--primary)] transition-colors"
              >
                <FaUserCircle size={24} />
                <FiChevronDown />
              </button>
              
              {showProfileDropdown && (
                <div 
                  className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-[var(--bg-light)] border border-[var(--border)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-4 py-3 border-b border-[var(--border-muted)]">
                    <p className="text-sm font-medium text-[var(--text)]"><strong>{capitalizeFirstLetter(username ?? "")}</strong></p>
                   {/* AccounType Displayment */}
                    <p className="text-xs text-[var(--text-muted)]">Role: <strong>{accountType?.replace("ROLE_", "")}</strong></p>
                  </div>
                  <div className="py-1">
                    {profileOptions.map((option) => (
                      <button
                        key={option}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-[var(--highlight)]"
                      >
                        {option}
                      </button>
                    ))}
                    <button  className="block w-full text-left px-4 py-2 text-sm hover:bg-[var(--highlight)]">
                      <Link to="/login" >
                        Logout
                      </Link>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-[var(--bg-light)]"
            >
              {mobileMenuOpen ? (
                <FiX size={24} className="text-[var(--text)]" />
              ) : (
                <svg
                  className="w-6 h-6 text-[var(--text)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-light)] border-t border-[var(--border)]">
          <div className="px-4 py-3 space-y-4">
            {/* Academic Year Section */}
            <div className="flex flex-col">
              <div className="flex items-center text-[var(--text-muted)] mb-2">
                <FiCalendar className="mr-2" />
                <span>Academic Year</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {academicYears.map(year => (
                  <button
                    key={year}
                    onClick={() => {
                      setAcademicYear(year);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 px-3 rounded border ${
                      year === academicYear 
                        ? 'bg-[var(--primary)] text-[var(--bg)] border-[var(--primary)]' 
                        : 'border-[var(--border)]'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-[var(--border-muted)]">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="flex flex-col items-center p-2 rounded-lg hover:bg-[var(--bg)]"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                <span className="text-xs mt-1">Theme</span>
              </button>
              
              <button className="flex flex-col items-center p-2 rounded-lg relative hover:bg-[var(--bg)]">
                <FiBell size={20} />
                <span className="absolute top-1 right-4 w-2 h-2 bg-[var(--danger)] rounded-full"></span>
                <span className="text-xs mt-1">Alerts</span>
              </button>
              
              <button className="flex flex-col items-center p-2 rounded-lg hover:bg-[var(--bg)]">
                <FiMessageSquare size={20} />
                <span className="text-xs mt-1">Chat</span>
              </button>
              
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex flex-col items-center p-2 rounded-lg hover:bg-[var(--bg)]"
              >
                <FaUserCircle size={20} />
                <span className="text-xs mt-1">Profile</span>
              </button>
            </div>
            
            {/* Profile Dropdown in Mobile */}
            {showProfileDropdown && (
              <div className="mt-4 p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                <div className="px-2 py-1">
                  <p className="text-sm font-medium text-[var(--text)]">John Doe</p>
                  <p className="text-xs text-[var(--text-muted)]">Administrator</p>
                </div>
                <div className="mt-2 space-y-1">
                  {profileOptions.map((option) => (
                    <button
                      key={option}
                      className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-[var(--highlight)]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}


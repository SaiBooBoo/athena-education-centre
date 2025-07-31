import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

// UI Components
import HeaderComponent from "./ui_components/HeaderComponent";
import FooterComponent from "./ui_components/FooterComponent";
import Sidebar from "./ui_components/SideBarComponent";
import LoginComponent from "./ui_components/LoginComponent";
import HomeComponent from "./ui_components/HomeComponent";

// Dashboard Pages
import StudentDashboardComponent from "./pages/search/StudentSearchComponent";
import ParentDashboardComponent from "./pages/search/ParentSearchComponent";
import TeacherDashboardComponent from "./pages/search/TeacherSearchComponent";
import AdminDashboardComponent from "./pages/search/AdminDashboardComponent";

// Support Pages
import HelpComponent from "./pages/support/HelpComponent";
import SettingsComponent from "./pages/support/SettingsComponent";

// Management Pages
import ClassesComponent from "./pages/management/ClassesComponent";
import SubjectsComponent from "./pages/management/SubjectsComponent";
import AttentancesComponent from "./pages/management/AttentancesComponent";
import TimeTableComponent from "./pages/management/TimeTableComponent";
import StudentPromotionComponent from "./pages/management/StudentPromotionComponent";

// Registration Pages
import StudentRegistration from "./pages/registeration/StudentRegistration";
import TeacherRegistration from "./pages/registeration/TeacherRegistration";
import ParentRegistration from "./pages/registeration/ParentRegistration";

// Auth Service
import { isLoggedIn } from "./service/AuthService";
import ParentEditComponent from "./pages/edits/ParentEditComponent";
import StudentEditComponent from "./pages/edits/StudentEditComponent";
import TeacherEditComponent from "./pages/edits/TeacherEditComponent";
import StudentFeesComponent from "./pages/management/StudentFeesComponent";

// Guard Component
const AuthenticationGuard = ({ children }) => {
  return isLoggedIn() ? children : <LoginComponent />;
};

// Shared Layout Wrapper
const MainLayout = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Sidebar
        isExpanded={sidebarExpanded}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarExpanded ? "ml-64" : "ml-20"
        }`}
      >
        <HeaderComponent
          isSidebarExpanded={sidebarExpanded}
          toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        />
        <main className="flex-grow p-6 pb-16 md:pb-6">{children}</main>

        <FooterComponent />
      </div>
    </div>
  );
};

// Route Configuration
const routeConfig = [
  { path: "/", component: <HomeComponent /> },
  { path: "/studentDashboard", component: <StudentDashboardComponent /> },
  { path: "/parentDashboard", component: <ParentDashboardComponent /> },
  { path: "/teacherDashboard", component: <TeacherDashboardComponent /> },
  { path: "/adminDashboard", component: <AdminDashboardComponent /> },
  { path: "/help", component: <HelpComponent /> },
  { path: "/settings", component: <SettingsComponent /> },
  { path: "/classes", component: <ClassesComponent /> },
  { path: "/subjects", component: <SubjectsComponent /> },
  { path: "/attendance", component: <AttentancesComponent /> },
  { path: "/timeTable", component: <TimeTableComponent /> },
  { path: "/studentPromotion", component: <StudentPromotionComponent /> },
  { path: "/schoolFees", component: <StudentFeesComponent /> },
  { path: "/registerStudent", component: <StudentRegistration /> },
  { path: "/registerTeacher", component: <TeacherRegistration /> },
  { path: "/registerParent", component: <ParentRegistration /> },
  { path: "/edit-parent/:id", component: <ParentEditComponent /> },
  { path: "/edit-student/:id", component: <StudentEditComponent /> },
  { path: "/edit-teacher/:id", component: <TeacherEditComponent /> },
];

// App Component
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />

        {/* Dynamic Protected Routes */}
        {routeConfig.map(({ path, component }) => (
          <Route
            key={path}
            path={path}
            element={
              <AuthenticationGuard>
                <MainLayout>{component}</MainLayout>
              </AuthenticationGuard>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

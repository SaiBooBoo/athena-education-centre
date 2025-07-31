import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HelpComponent() {
  const [activeTab, setActiveTab] = useState('super-admin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg)] to-[var(--bg-light)] p-4 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-40 h-40 bg-[var(--primary)] rounded-full mix-blend-soft-light"></div>
        <div className="absolute bottom-20 right-1/3 w-60 h-60 bg-[var(--secondary)] rounded-full mix-blend-soft-light"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[var(--highlight)] rounded-full mix-blend-soft-light"></div>
      </div>

      <div className="max-w-6xl mx-auto py-8 z-10 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
            Athena Learning Center Help Center
          </h1>
          <p className="text-xl text-[var(--text-light)] max-w-2xl mx-auto">
            Learn how to navigate and use Athena Learning Center based on your role
          </p>
        </div>

        {/* Role Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button 
            onClick={() => setActiveTab('super-admin')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === 'super-admin' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-light)] text-[var(--text)] hover:bg-[var(--border)]'}`}
          >
            Super Admin
          </button>
          <button 
            onClick={() => setActiveTab('teacher')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === 'teacher' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-light)] text-[var(--text)] hover:bg-[var(--border)]'}`}
          >
            Teacher
          </button>
          <button 
            onClick={() => setActiveTab('student')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === 'student' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-light)] text-[var(--text)] hover:bg-[var(--border)]'}`}
          >
            Student
          </button>
          <button 
            onClick={() => setActiveTab('parent')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === 'parent' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-light)] text-[var(--text)] hover:bg-[var(--border)]'}`}
          >
            Parent
          </button>
        </div>

        {/* Role Content */}
        <div className="bg-[var(--bg-light)] rounded-3xl shadow-xl overflow-hidden border border-[var(--border)]">
          {/* Super Admin Content */}
          {activeTab === 'super-admin' && (
            <div className="p-6 md:p-10">
              <div className="flex items-center mb-8">
                <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[var(--text)]">Super Admin Dashboard</h2>
                  <p className="text-[var(--text-light)]">Full access to manage the entire learning ecosystem</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">User Management</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Create, edit, and delete student, teacher, and parent accounts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Assign roles and permissions to all users</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Manage class assignments and enrollments</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Academic Management</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Create and manage subjects and courses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Set up classrooms and schedules</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Define grading systems and academic terms</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Financial Oversight</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>View financial statements and reports</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Manage tuition fees and payments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Generate financial analytics and forecasts</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Analytics & Reports</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Access institution-wide performance statistics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>View attendance and academic trends</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Generate custom reports for all data points</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-[var(--primary-light)] to-transparent p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-[var(--text)] mb-4">Getting Started as Super Admin</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</span>
                    <p>Set up your institution details in the Settings section</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</span>
                    <p>Create your academic structure (subjects, classrooms, schedules)</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</span>
                    <p>Add teachers, students, and parents to the system</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">4</span>
                    <p>Configure financial settings and payment systems</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">5</span>
                    <p>Explore analytics to monitor your institution's performance</p>
                  </li>
                </ol>
              </div>
            </div>
          )}
          
          {/* Teacher Content */}
          {activeTab === 'teacher' && (
            <div className="p-6 md:p-10">
              <div className="flex items-center mb-8">
                <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[var(--text)]">Teacher Dashboard</h2>
                  <p className="text-[var(--text-light)]">Tools to manage classes, assignments, and student performance</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Class Management</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>View and manage your assigned classes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Access class schedules and student rosters</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Upload class materials and resources</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Assignment Management</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Create and distribute homework assignments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Set deadlines and track submission status</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Grade assignments and provide feedback</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Attendance Tracking</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Take daily attendance for your classes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>View attendance history and patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Generate attendance reports</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Performance Monitoring</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Record exam scores and assessment results</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Track individual student progress over time</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Identify students needing additional support</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-[var(--primary-light)] to-transparent p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-[var(--text)] mb-4">Teacher Workflow</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</span>
                    <p>Start your day by taking attendance for each class</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</span>
                    <p>Create and assign homework through the Assignments section</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</span>
                    <p>After exams, record scores in the Gradebook</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">4</span>
                    <p>Monitor student performance using analytics dashboards</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">5</span>
                    <p>Communicate with students and parents through the messaging system</p>
                  </li>
                </ol>
              </div>
            </div>
          )}
          
          {/* Student Content */}
          {activeTab === 'student' && (
            <div className="p-6 md:p-10">
              <div className="flex items-center mb-8">
                <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[var(--text)]">Student Dashboard</h2>
                  <p className="text-[var(--text-light)]">Track your academic progress and access learning resources</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Academic Performance</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>View grades for all subjects and exams</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Track your progress over time with visual charts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Compare your performance with class averages</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Attendance Records</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>View your attendance history for all classes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>See attendance percentages for each subject</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Check for any attendance concerns</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Assignments & Homework</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>View all assigned homework with deadlines</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Submit completed assignments online</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Check grades and feedback on submitted work</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Learning Resources</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Access class materials shared by teachers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>View your class schedule and timetable</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Find recommended learning resources</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-[var(--primary-light)] to-transparent p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-[var(--text)] mb-4">Student Checklist</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</span>
                    <p>Check your schedule daily for upcoming classes</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</span>
                    <p>Regularly review the Assignments section for new homework</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</span>
                    <p>After exams, check your Performance dashboard for results</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">4</span>
                    <p>Monitor your attendance records monthly</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">5</span>
                    <p>Download learning resources for upcoming topics</p>
                  </li>
                </ol>
              </div>
            </div>
          )}
          
          {/* Parent Content */}
          {activeTab === 'parent' && (
            <div className="p-6 md:p-10">
              <div className="flex items-center mb-8">
                <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[var(--text)]">Parent Dashboard</h2>
                  <p className="text-[var(--text-light)]">Monitor your child's academic progress and school activities</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Child's Performance</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>View exam results and subject grades</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Track academic progress over time</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>See teacher comments and feedback</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Attendance Monitoring</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Check your child's daily attendance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>View attendance history and patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Receive notifications for absences</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Assignment Tracking</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>See assigned homework and deadlines</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Check completion status of assignments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>View grades and feedback on submitted work</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-4">Communication</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Message teachers directly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>Receive school announcements and updates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2">•</span>
                      <span>View upcoming school events</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-[var(--primary-light)] to-transparent p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-[var(--text)] mb-4">Parent Guide</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</span>
                    <p>Set up notifications for important updates in Account Settings</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</span>
                    <p>Check the Performance section weekly to monitor academic progress</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</span>
                    <p>Review the Attendance tab monthly for patterns</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">4</span>
                    <p>Use the Messaging system to communicate with teachers</p>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">5</span>
                    <p>View the Calendar for important school events and deadlines</p>
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Additional Help Section */}
        <div className="mt-10 bg-[var(--bg-light)] rounded-3xl shadow-xl overflow-hidden border border-[var(--border)] p-8">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-6">Need More Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
              <h3 className="text-xl font-bold text-[var(--text)] mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Contact Support
              </h3>
              <p className="text-[var(--text-light)]">Our support team is available 24/7 to assist you with any questions or issues.</p>
              <button className="mt-4 text-[var(--primary)] font-medium hover:underline">Send a Message</button>
            </div>
            
            <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
              <h3 className="text-xl font-bold text-[var(--text)] mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Video Tutorials
              </h3>
              <p className="text-[var(--text-light)]">Watch step-by-step video guides on how to use Athena Learning Center.</p>
              <button className="mt-4 text-[var(--primary)] font-medium hover:underline">View Tutorials</button>
            </div>
            
            <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
              <h3 className="text-xl font-bold text-[var(--text)] mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Knowledge Base
              </h3>
              <p className="text-[var(--text-light)]">Browse our comprehensive knowledge base for answers to common questions.</p>
              <button className="mt-4 text-[var(--primary)] font-medium hover:underline">Browse Articles</button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-10 text-center text-[var(--text-light)]">
          <p>© 2023 Athena Learning Center. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link to="#" className="hover:text-[var(--primary)] transition">Privacy Policy</Link>
            <Link to="#" className="hover:text-[var(--primary)] transition">Terms of Service</Link>
            <Link to="#" className="hover:text-[var(--primary)] transition">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
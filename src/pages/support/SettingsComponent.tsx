import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SettingsComponent() {
  const [activeTab, setActiveTab] = useState('general');
  const [schoolInfo, setSchoolInfo] = useState({
    name: "Athena Learning Center",
    address: "123 Education Street, Knowledge City",
    phone: "(555) 123-4567",
    email: "info@athenalearning.edu",
    principal: "Dr. Sophia Williams"
  });
  const [academicSettings, setAcademicSettings] = useState({
    academicYear: "2023-2024",
    gradingSystem: "Percentage",
    termStructure: "Semester",
    attendanceThreshold: 85
  });
  const [financialSettings, setFinancialSettings] = useState({
    currency: "USD",
    tuitionDueDate: "5th of each month",
    lateFee: 25,
    paymentMethods: ["Credit Card", "Bank Transfer", "Cash"]
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    eventReminders: true,
    gradeUpdates: true,
    attendanceAlerts: true
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordComplexity: "High"
  });

  const handleInputChange = (e, settingsType) => {
    const { name, value, type, checked } = e.target;
    
    if (settingsType === 'school') {
      setSchoolInfo(prev => ({ ...prev, [name]: value }));
    } else if (settingsType === 'academic') {
      setAcademicSettings(prev => ({ ...prev, [name]: value }));
    } else if (settingsType === 'financial') {
      setFinancialSettings(prev => ({ ...prev, [name]: value }));
    } else if (settingsType === 'notifications') {
      setNotificationSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    } else if (settingsType === 'security') {
      setSecuritySettings(prev => ({ ...prev, [name]: value }));
    }
  };

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-2">System Settings</h1>
            <p className="text-[var(--text-light)]">Configure your school management system</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="bg-[var(--primary)] text-white px-5 py-2 rounded-xl hover:bg-[var(--primary-dark)] transition">
              Save Changes
            </button>
            <button className="bg-[var(--bg-light)] text-[var(--text)] border border-[var(--border)] px-5 py-2 rounded-xl hover:bg-[var(--bg)] transition">
              Cancel
            </button>
          </div>
        </div>

        {/* Settings Navigation */}
        <div className="bg-[var(--bg-light)] rounded-2xl shadow-md border border-[var(--border)] p-2 mb-8">
          <div className="flex flex-wrap gap-1">
            <button 
              onClick={() => setActiveTab('general')}
              className={`px-5 py-3 rounded-xl font-medium transition-all ${activeTab === 'general' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--text)] hover:bg-[var(--border)]'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              General
            </button>
            <button 
              onClick={() => setActiveTab('academic')}
              className={`px-5 py-3 rounded-xl font-medium transition-all ${activeTab === 'academic' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--text)] hover:bg-[var(--border)]'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
              Academic
            </button>
            <button 
              onClick={() => setActiveTab('financial')}
              className={`px-5 py-3 rounded-xl font-medium transition-all ${activeTab === 'financial' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--text)] hover:bg-[var(--border)]'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Financial
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`px-5 py-3 rounded-xl font-medium transition-all ${activeTab === 'notifications' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--text)] hover:bg-[var(--border)]'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Notifications
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`px-5 py-3 rounded-xl font-medium transition-all ${activeTab === 'security' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--text)] hover:bg-[var(--border)]'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Security
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="bg-[var(--bg-light)] rounded-3xl shadow-xl overflow-hidden border border-[var(--border)]">
          
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="p-6 md:p-10">
              <div className="flex items-center mb-8">
                <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[var(--text)]">General Settings</h2>
                  <p className="text-[var(--text-light)]">Configure your school's basic information and preferences</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium text-[var(--text)] mb-2">School Name</label>
                    <input
                      type="text"
                      name="name"
                      value={schoolInfo.name}
                      onChange={(e) => handleInputChange(e, 'school')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium text-[var(--text)] mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={schoolInfo.address}
                      onChange={(e) => handleInputChange(e, 'school')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium text-[var(--text)] mb-2">Contact Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={schoolInfo.phone}
                      onChange={(e) => handleInputChange(e, 'school')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium text-[var(--text)] mb-2">Contact Email</label>
                    <input
                      type="email"
                      name="email"
                      value={schoolInfo.email}
                      onChange={(e) => handleInputChange(e, 'school')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium text-[var(--text)] mb-2">Principal</label>
                    <input
                      type="text"
                      name="principal"
                      value={schoolInfo.principal}
                      onChange={(e) => handleInputChange(e, 'school')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium text-[var(--text)] mb-2">School Logo</label>
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-xl bg-gray-200 border-2 border-dashed border-[var(--border)] flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <button className="bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] px-4 py-2 rounded-xl hover:bg-[var(--bg-light)] transition">
                        Upload New Logo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Academic Settings */}
          {activeTab === 'academic' && (
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
                  <h2 className="text-3xl font-bold text-[var(--text)]">Academic Settings</h2>
                  <p className="text-[var(--text-light)]">Configure academic year, grading system, and attendance policies</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium text-[var(--text)] mb-2">Academic Year</label>
                    <input
                      type="text"
                      name="academicYear"
                      value={academicSettings.academicYear}
                      onChange={(e) => handleInputChange(e, 'academic')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium text-[var(--text)] mb-2">Grading System</label>
                    <select
                      name="gradingSystem"
                      value={academicSettings.gradingSystem}
                      onChange={(e) => handleInputChange(e, 'academic')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                    >
                      <option value="Percentage">Percentage</option>
                      <option value="Letter Grade">Letter Grade (A-F)</option>
                      <option value="GPA">GPA (4.0 scale)</option>
                      <option value="Standards">Standards-Based</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium text-[var(--text)] mb-2">Term Structure</label>
                    <select
                      name="termStructure"
                      value={academicSettings.termStructure}
                      onChange={(e) => handleInputChange(e, 'academic')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                    >
                      <option value="Semester">Semester (2 terms)</option>
                      <option value="Trimester">Trimester (3 terms)</option>
                      <option value="Quarter">Quarter (4 terms)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium text-[var(--text)] mb-2">
                      Attendance Threshold ({academicSettings.attendanceThreshold}%)
                    </label>
                    <input
                      type="range"
                      name="attendanceThreshold"
                      min="50"
                      max="100"
                      value={academicSettings.attendanceThreshold}
                      onChange={(e) => handleInputChange(e, 'academic')}
                      className="w-full h-3 bg-[var(--bg)] rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-sm text-[var(--text-light)]">
                      Minimum attendance required to pass courses
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold text-[var(--text)] mb-4">Subject Management</h3>
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-[var(--text)]">Current Subjects</h4>
                    <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-xl text-sm hover:bg-[var(--primary-dark)] transition">
                      + Add New Subject
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[var(--bg-light)] p-4 rounded-xl border border-[var(--border)]">
                      <div className="font-medium text-[var(--text)]">Mathematics</div>
                      <div className="text-sm text-[var(--text-light)]">Grades 1-12</div>
                    </div>
                    <div className="bg-[var(--bg-light)] p-4 rounded-xl border border-[var(--border)]">
                      <div className="font-medium text-[var(--text)]">Science</div>
                      <div className="text-sm text-[var(--text-light)]">Grades 1-12</div>
                    </div>
                    <div className="bg-[var(--bg-light)] p-4 rounded-xl border border-[var(--border)]">
                      <div className="font-medium text-[var(--text)]">English</div>
                      <div className="text-sm text-[var(--text-light)]">Grades 1-12</div>
                    </div>
                    <div className="bg-[var(--bg-light)] p-4 rounded-xl border border-[var(--border)]">
                      <div className="font-medium text-[var(--text)]">History</div>
                      <div className="text-sm text-[var(--text-light)]">Grades 6-12</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Financial Settings */}
          {activeTab === 'financial' && (
            <div className="p-6 md:p-10">
              <div className="flex items-center mb-8">
                <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[var(--text)]">Financial Settings</h2>
                  <p className="text-[var(--text-light)]">Configure tuition, fees, and payment settings</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium text-[var(--text)] mb-2">Currency</label>
                    <select
                      name="currency"
                      value={financialSettings.currency}
                      onChange={(e) => handleInputChange(e, 'financial')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                    >
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="GBP">British Pound (GBP)</option>
                      <option value="INR">Indian Rupee (INR)</option>
                      <option value="AUD">Australian Dollar (AUD)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium text-[var(--text)] mb-2">Tuition Due Date</label>
                    <input
                      type="text"
                      name="tuitionDueDate"
                      value={financialSettings.tuitionDueDate}
                      onChange={(e) => handleInputChange(e, 'financial')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                      placeholder="e.g. 1st of each month"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium text-[var(--text)] mb-2">Late Fee ($)</label>
                    <input
                      type="number"
                      name="lateFee"
                      value={financialSettings.lateFee}
                      onChange={(e) => handleInputChange(e, 'financial')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium text-[var(--text)] mb-2">Accepted Payment Methods</label>
                    <div className="space-y-3">
                      {financialSettings.paymentMethods.map((method, index) => (
                        <div key={index} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={`method-${index}`}
                            checked={true}
                            className="h-5 w-5 text-[var(--primary)] rounded focus:ring-[var(--primary)]"
                          />
                          <label htmlFor={`method-${index}`} className="ml-3 text-[var(--text)]">
                            {method}
                          </label>
                        </div>
                      ))}
                      <button className="mt-2 text-[var(--primary)] font-medium hover:underline">
                        + Add another payment method
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold text-[var(--text)] mb-4">Fee Structure</h3>
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--border)]">
                        <th className="text-left py-3 text-[var(--text)]">Grade Level</th>
                        <th className="text-left py-3 text-[var(--text)]">Tuition Fee</th>
                        <th className="text-left py-3 text-[var(--text)]">Activity Fee</th>
                        <th className="text-left py-3 text-[var(--text)]">Technology Fee</th>
                        <th className="text-left py-3 text-[var(--text)]">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[var(--border)]">
                        <td className="py-3 text-[var(--text)]">Elementary (1-5)</td>
                        <td className="py-3 text-[var(--text)]">$5,000</td>
                        <td className="py-3 text-[var(--text)]">$200</td>
                        <td className="py-3 text-[var(--text)]">$100</td>
                        <td className="py-3 text-[var(--text)] font-medium">$5,300</td>
                      </tr>
                      <tr className="border-b border-[var(--border)]">
                        <td className="py-3 text-[var(--text)]">Middle School (6-8)</td>
                        <td className="py-3 text-[var(--text)]">$6,500</td>
                        <td className="py-3 text-[var(--text)]">$300</td>
                        <td className="py-3 text-[var(--text)]">$150</td>
                        <td className="py-3 text-[var(--text)] font-medium">$6,950</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-[var(--text)]">High School (9-12)</td>
                        <td className="py-3 text-[var(--text)]">$8,000</td>
                        <td className="py-3 text-[var(--text)]">$400</td>
                        <td className="py-3 text-[var(--text)]">$200</td>
                        <td className="py-3 text-[var(--text)] font-medium">$8,600</td>
                      </tr>
                    </tbody>
                  </table>
                  <button className="mt-4 text-[var(--primary)] font-medium hover:underline">
                    Edit Fee Structure
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="p-6 md:p-10">
              <div className="flex items-center mb-8">
                <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[var(--text)]">Notification Settings</h2>
                  <p className="text-[var(--text-light)]">Configure how and when users receive notifications</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-6">Notification Channels</h3>
                  
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-[var(--border)]">
                    <div>
                      <h4 className="text-lg font-medium text-[var(--text)]">Email Notifications</h4>
                      <p className="text-[var(--text-light)]">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => handleInputChange(e, 'notifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-[var(--border)]">
                    <div>
                      <h4 className="text-lg font-medium text-[var(--text)]">SMS Notifications</h4>
                      <p className="text-[var(--text-light)]">Receive notifications via text message</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="smsNotifications"
                        checked={notificationSettings.smsNotifications}
                        onChange={(e) => handleInputChange(e, 'notifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-[var(--text)]">In-App Notifications</h4>
                      <p className="text-[var(--text-light)]">Show notifications within the application</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={true}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[var(--primary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-6">Notification Preferences</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-[var(--text)]">Event Reminders</h4>
                        <p className="text-[var(--text-light)]">Get reminders for upcoming school events</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="eventReminders"
                          checked={notificationSettings.eventReminders}
                          onChange={(e) => handleInputChange(e, 'notifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-[var(--text)]">Grade Updates</h4>
                        <p className="text-[var(--text-light)]">Notify when new grades are posted</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="gradeUpdates"
                          checked={notificationSettings.gradeUpdates}
                          onChange={(e) => handleInputChange(e, 'notifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-[var(--text)]">Attendance Alerts</h4>
                        <p className="text-[var(--text-light)]">Receive alerts for student attendance issues</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="attendanceAlerts"
                          checked={notificationSettings.attendanceAlerts}
                          onChange={(e) => handleInputChange(e, 'notifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-[var(--text)]">Payment Reminders</h4>
                        <p className="text-[var(--text-light)]">Remind about upcoming tuition payments</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={true}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[var(--primary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="p-6 md:p-10">
              <div className="flex items-center mb-8">
                <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[var(--text)]">Security Settings</h2>
                  <p className="text-[var(--text-light)]">Configure system security and access controls</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-[var(--text)]">Two-Factor Authentication</h3>
                        <p className="text-[var(--text-light)]">Add an extra layer of security to all accounts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="twoFactorAuth"
                          checked={securitySettings.twoFactorAuth}
                          onChange={(e) => handleInputChange(e, 'security')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                      </label>
                    </div>
                    
                    {securitySettings.twoFactorAuth && (
                      <div className="mt-4 pt-4 border-t border-[var(--border)]">
                        <h4 className="text-md font-medium text-[var(--text)] mb-3">2FA Methods</h4>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              id="authenticator" 
                              name="2faMethod" 
                              checked 
                              className="h-4 w-4 text-[var(--primary)]"
                            />
                            <label htmlFor="authenticator" className="ml-3 text-[var(--text)]">
                              Authenticator App (Recommended)
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              id="sms" 
                              name="2faMethod" 
                              className="h-4 w-4 text-[var(--primary)]"
                            />
                            <label htmlFor="sms" className="ml-3 text-[var(--text)]">
                              SMS Verification
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              id="email" 
                              name="2faMethod" 
                              className="h-4 w-4 text-[var(--primary)]"
                            />
                            <label htmlFor="email" className="ml-3 text-[var(--text)]">
                              Email Verification
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                    <h3 className="text-lg font-medium text-[var(--text)] mb-4">Session Timeout</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[var(--text-light)]">Automatically log out inactive users after:</p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="range"
                          name="sessionTimeout"
                          min="5"
                          max="120"
                          step="5"
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => handleInputChange(e, 'security')}
                          className="w-32 mr-4 h-3 bg-[var(--bg)] rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-lg font-medium text-[var(--text)]">
                          {securitySettings.sessionTimeout} min
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                    <h3 className="text-lg font-medium text-[var(--text)] mb-4">Password Policies</h3>
                    
                    <div className="mb-4">
                      <label className="block text-md font-medium text-[var(--text)] mb-2">Password Complexity</label>
                      <select
                        name="passwordComplexity"
                        value={securitySettings.passwordComplexity}
                        onChange={(e) => handleInputChange(e, 'security')}
                        className="w-full px-4 py-2 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition bg-[var(--bg-light)] text-[var(--text)]"
                      >
                        <option value="Low">Low (minimum 6 characters)</option>
                        <option value="Medium">Medium (minimum 8 characters with letters and numbers)</option>
                        <option value="High">High (minimum 10 characters with letters, numbers, and symbols)</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[var(--text-light)]">Require password change every 90 days</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={true}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[var(--primary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                    <h3 className="text-lg font-medium text-[var(--text)] mb-4">Role-Based Access</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-[var(--bg-light)] rounded-xl">
                        <div>
                          <div className="font-medium text-[var(--text)]">Super Admin</div>
                          <div className="text-sm text-[var(--text-light)]">Full system access</div>
                        </div>
                        <button className="text-[var(--primary)] hover:underline">Edit Permissions</button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-[var(--bg-light)] rounded-xl">
                        <div>
                          <div className="font-medium text-[var(--text)]">Teachers</div>
                          <div className="text-sm text-[var(--text-light)]">Class, student, and grade management</div>
                        </div>
                        <button className="text-[var(--primary)] hover:underline">Edit Permissions</button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-[var(--bg-light)] rounded-xl">
                        <div>
                          <div className="font-medium text-[var(--text)]">Students</div>
                          <div className="text-sm text-[var(--text-light)]">View grades, assignments, and schedules</div>
                        </div>
                        <button className="text-[var(--primary)] hover:underline">Edit Permissions</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-[var(--text-light)]">
          <p>© 2023 Athena Learning Center. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link to="#" className="hover:text-[var(--primary)] transition">Privacy Policy</Link>
            <Link to="#" className="hover:text-[var(--primary)] transition">Terms of Service</Link>
            <Link to="#" className="hover:text-[var(--primary)] transition">Help Center</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
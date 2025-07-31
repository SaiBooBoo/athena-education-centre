import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TimetableComponent = () => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  
  // Academic terms data
  const academicTerms = [
    { id: 'Term 1', name: 'Term 1 (Sep - Dec)' },
    { id: 'Term 2', name: 'Term 2 (Jan - Mar)' },
    { id: 'Term 3', name: 'Term 3 (Apr - Jun)' },
    { id: 'Term 4', name: 'Term 4 (Jul - Aug)' }
  ];
  
  // Sample timetable data for each term
  const timetableData = {
    'Term 1': [
      { day: 'Monday', periods: [
        { time: '8:00 - 9:00', subject: 'Mathematics', teacher: 'Mr. Johnson', room: 'Room 101' },
        { time: '9:00 - 10:00', subject: 'Science', teacher: 'Dr. Smith', room: 'Lab 201' },
        { time: '10:30 - 11:30', subject: 'English', teacher: 'Ms. Davis', room: 'Room 105' },
        { time: '11:30 - 12:30', subject: 'History', teacher: 'Mr. Thompson', room: 'Room 203' },
        { time: '1:30 - 2:30', subject: 'Art', teacher: 'Ms. Rodriguez', room: 'Art Studio' },
      ]},
      { day: 'Tuesday', periods: [
        { time: '8:00 - 9:00', subject: 'English', teacher: 'Ms. Davis', room: 'Room 105' },
        { time: '9:00 - 10:00', subject: 'Mathematics', teacher: 'Mr. Johnson', room: 'Room 101' },
        { time: '10:30 - 11:30', subject: 'Physical Education', teacher: 'Coach Wilson', room: 'Gym' },
        { time: '11:30 - 12:30', subject: 'Science', teacher: 'Dr. Smith', room: 'Lab 201' },
        { time: '1:30 - 2:30', subject: 'Music', teacher: 'Mr. Parker', room: 'Music Hall' },
      ]},
      { day: 'Wednesday', periods: [
        { time: '8:00 - 9:00', subject: 'History', teacher: 'Mr. Thompson', room: 'Room 203' },
        { time: '9:00 - 10:00', subject: 'Foreign Language', teacher: 'Ms. Dubois', room: 'Room 107' },
        { time: '10:30 - 11:30', subject: 'Mathematics', teacher: 'Mr. Johnson', room: 'Room 101' },
        { time: '11:30 - 12:30', subject: 'Science', teacher: 'Dr. Smith', room: 'Lab 201' },
        { time: '1:30 - 2:30', subject: 'Computer Science', teacher: 'Mr. Chen', room: 'Comp Lab' },
      ]},
      { day: 'Thursday', periods: [
        { time: '8:00 - 9:00', subject: 'Science', teacher: 'Dr. Smith', room: 'Lab 201' },
        { time: '9:00 - 10:00', subject: 'English', teacher: 'Ms. Davis', room: 'Room 105' },
        { time: '10:30 - 11:30', subject: 'Mathematics', teacher: 'Mr. Johnson', room: 'Room 101' },
        { time: '11:30 - 12:30', subject: 'Foreign Language', teacher: 'Ms. Dubois', room: 'Room 107' },
        { time: '1:30 - 2:30', subject: 'Drama', teacher: 'Ms. Bennett', room: 'Auditorium' },
      ]},
      { day: 'Friday', periods: [
        { time: '8:00 - 9:00', subject: 'Mathematics', teacher: 'Mr. Johnson', room: 'Room 101' },
        { time: '9:00 - 10:00', subject: 'Science', teacher: 'Dr. Smith', room: 'Lab 201' },
        { time: '10:30 - 11:30', subject: 'English', teacher: 'Ms. Davis', room: 'Room 105' },
        { time: '11:30 - 12:30', subject: 'History', teacher: 'Mr. Thompson', room: 'Room 203' },
        { time: '1:30 - 2:30', subject: 'Club Activities', teacher: 'Various', room: 'Various' },
      ]},
      { day: 'Saturday', periods: [] },
      { day: 'Sunday', periods: [] },
    ],
    'Term 2': [
      // Similar structure with different subjects
    ],
    'Term 3': [
      // Similar structure with different subjects
    ],
    'Term 4': [
      // Similar structure with different subjects
    ]
  };
  
  // Academic year events
  const academicEvents = [
    { date: '2023-09-05', title: 'First Day of School', term: 'Term 1' },
    { date: '2023-10-10', title: 'Parent-Teacher Conference', term: 'Term 1' },
    { date: '2023-11-23', title: 'Thanksgiving Break', term: 'Term 1' },
    { date: '2023-12-20', title: 'Winter Break Begins', term: 'Term 1' },
    { date: '2024-01-08', title: 'Second Term Begins', term: 'Term 2' },
    { date: '2024-02-19', title: 'Mid-Term Break', term: 'Term 2' },
    { date: '2024-03-28', title: 'End of Term 2', term: 'Term 2' },
    { date: '2024-04-08', title: 'Third Term Begins', term: 'Term 3' },
    { date: '2024-05-27', title: 'Memorial Day', term: 'Term 3' },
    { date: '2024-06-14', title: 'End of Term 3', term: 'Term 3' },
    { date: '2024-07-08', title: 'Fourth Term Begins', term: 'Term 4' },
    { date: '2024-08-15', title: 'Summer Break Begins', term: 'Term 4' },
  ];

  // Get events for the selected term
  const termEvents = academicEvents.filter(event => event.term === selectedTerm);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg)] to-[var(--bg-light)] p-4 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-40 h-40 bg-[var(--primary)] rounded-full mix-blend-soft-light"></div>
        <div className="absolute bottom-20 right-1/3 w-60 h-60 bg-[var(--secondary)] rounded-full mix-blend-soft-light"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[var(--highlight)] rounded-full mix-blend-soft-light"></div>
      </div>

      <div className="max-w-7xl mx-auto py-8 z-10 relative">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">Academic Timetable 2023-2024</h1>
          <p className="text-xl text-[var(--text-light)] max-w-3xl mx-auto">
            View the complete schedule for the academic year, including class periods, holidays, and important events
          </p>
        </div>
        
        {/* Term Selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {academicTerms.map(term => (
            <button
              key={term.id}
              onClick={() => setSelectedTerm(term.id)}
              className={`px-5 py-3 rounded-xl font-medium transition-all ${
                selectedTerm === term.id
                  ? 'bg-[var(--primary)] text-white shadow-lg'
                  : 'bg-[var(--bg-light)] text-[var(--text)] hover:bg-[var(--border)]'
              }`}
            >
              {term.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timetable Section */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--bg-light)] rounded-3xl shadow-xl overflow-hidden border border-[var(--border)]">
              <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] p-4 text-center">
                <h2 className="text-2xl font-bold text-white">{selectedTerm} Timetable</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--bg)]">
                      <th className="p-4 text-left text-[var(--text)] border-r border-[var(--border)]">Day</th>
                      <th className="p-4 text-left text-[var(--text)] border-r border-[var(--border)]">Period 1</th>
                      <th className="p-4 text-left text-[var(--text)] border-r border-[var(--border)]">Period 2</th>
                      <th className="p-4 text-left text-[var(--text)] border-r border-[var(--border)]">Period 3</th>
                      <th className="p-4 text-left text-[var(--text)] border-r border-[var(--border)]">Period 4</th>
                      <th className="p-4 text-left text-[var(--text)]">Period 5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetableData[selectedTerm].map((daySchedule, index) => (
                      <motion.tr 
                        key={daySchedule.day}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`
                          ${index % 2 === 0 ? 'bg-[var(--bg)]' : 'bg-[var(--bg-light)]'}
                          ${(daySchedule.day === 'Saturday' || daySchedule.day === 'Sunday') ? 'bg-[var(--bg-dark)]' : ''}
                        `}
                      >
                        <td className="p-4 font-semibold text-[var(--text)] border-r border-[var(--border)]">
                          {daySchedule.day}
                          {(daySchedule.day === 'Saturday' || daySchedule.day === 'Sunday') && (
                            <span className="ml-2 text-sm text-[var(--text-light)]">(Weekend)</span>
                          )}
                        </td>
                        
                        {daySchedule.periods.length > 0 ? (
                          daySchedule.periods.map((period, periodIndex) => (
                            <td key={periodIndex} className="p-4 border-r border-[var(--border)] last:border-r-0">
                              <div className="mb-1 font-medium text-[var(--text)]">{period.time}</div>
                              <div className="text-[var(--primary)] font-semibold">{period.subject}</div>
                              <div className="text-sm text-[var(--text-light)]">{period.teacher}</div>
                              <div className="text-sm text-[var(--text-light)]">{period.room}</div>
                            </td>
                          ))
                        ) : (
                          <td colSpan="5" className="p-4 text-center text-[var(--text-light)] italic">
                            No classes - Weekend
                          </td>
                        )}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 bg-[var(--bg)] border-t border-[var(--border)]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[var(--primary)] rounded mr-2"></div>
                    <span className="text-sm text-[var(--text)]">Core Subjects</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[var(--secondary)] rounded mr-2"></div>
                    <span className="text-sm text-[var(--text)]">Arts & Electives</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[var(--highlight)] rounded mr-2"></div>
                    <span className="text-sm text-[var(--text)]">Physical Education</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Academic Calendar */}
          <div>
            <div className="bg-[var(--bg-light)] rounded-3xl shadow-xl overflow-hidden border border-[var(--border)] mb-8">
              <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] p-4 text-center">
                <h2 className="text-2xl font-bold text-white">Academic Calendar</h2>
              </div>
              
              <div className="p-4">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-[var(--text)]">Key Dates for {selectedTerm}</h3>
                </div>
                
                <div className="space-y-4">
                  {termEvents.length > 0 ? (
                    termEvents.map((event, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start p-3 bg-[var(--bg)] rounded-xl border border-[var(--border)]"
                      >
                        <div className="bg-[var(--primary-light)] p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-[var(--text)]">{event.title}</h4>
                          <p className="text-sm text-[var(--text-light)]">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-[var(--text-light)]">
                      No events scheduled for this term
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Daily Schedule */}
            <div className="bg-[var(--bg-light)] rounded-3xl shadow-xl overflow-hidden border border-[var(--border)]">
              <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] p-4 text-center">
                <h2 className="text-2xl font-bold text-white">Daily Schedule</h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-[var(--bg)] rounded-lg">
                    <span className="text-[var(--text)]">Morning Assembly</span>
                    <span className="font-mono text-[var(--text-light)]">7:45 - 8:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[var(--bg)] rounded-lg">
                    <span className="text-[var(--text)]">Period 1</span>
                    <span className="font-mono text-[var(--text-light)]">8:00 - 9:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[var(--bg)] rounded-lg">
                    <span className="text-[var(--text)]">Period 2</span>
                    <span className="font-mono text-[var(--text-light)]">9:00 - 10:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[var(--bg)] rounded-lg">
                    <span className="text-[var(--primary)] font-medium">Break</span>
                    <span className="font-mono text-[var(--text-light)]">10:00 - 10:30</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[var(--bg)] rounded-lg">
                    <span className="text-[var(--text)]">Period 3</span>
                    <span className="font-mono text-[var(--text-light)]">10:30 - 11:30</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[var(--bg)] rounded-lg">
                    <span className="text-[var(--text)]">Period 4</span>
                    <span className="font-mono text-[var(--text-light)]">11:30 - 12:30</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[var(--bg)] rounded-lg">
                    <span className="text-[var(--primary)] font-medium">Lunch</span>
                    <span className="font-mono text-[var(--text-light)]">12:30 - 1:30</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[var(--bg)] rounded-lg">
                    <span className="text-[var(--text)]">Period 5</span>
                    <span className="font-mono text-[var(--text-light)]">1:30 - 2:30</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[var(--bg)] rounded-lg">
                    <span className="text-[var(--text)]">Extra-curricular</span>
                    <span className="font-mono text-[var(--text-light)]">2:30 - 3:30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Year Overview */}
        <div className="mt-10 bg-[var(--bg-light)] rounded-3xl shadow-xl overflow-hidden border border-[var(--border)]">
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] p-4 text-center">
            <h2 className="text-2xl font-bold text-white">Academic Year Overview</h2>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead>
                  <tr className="bg-[var(--bg)]">
                    <th className="p-3 text-left text-[var(--text)] border-r border-[var(--border)]">Term</th>
                    <th className="p-3 text-left text-[var(--text)] border-r border-[var(--border)]">Duration</th>
                    <th className="p-3 text-left text-[var(--text)] border-r border-[var(--border)]">Instruction Days</th>
                    <th className="p-3 text-left text-[var(--text)]">Key Events</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-semibold text-[var(--text)] border-r border-[var(--border)]">Term 1</td>
                    <td className="p-3 text-[var(--text-light)] border-r border-[var(--border)]">Sep 5 - Dec 20</td>
                    <td className="p-3 text-[var(--text-light)] border-r border-[var(--border)]">75 days</td>
                    <td className="p-3 text-[var(--text-light)]">First Day, Thanksgiving, Winter Break</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-semibold text-[var(--text)] border-r border-[var(--border)]">Term 2</td>
                    <td className="p-3 text-[var(--text-light)] border-r border-[var(--border)]">Jan 8 - Mar 28</td>
                    <td className="p-3 text-[var(--text-light)] border-r border-[var(--border)]">55 days</td>
                    <td className="p-3 text-[var(--text-light)]">Mid-Term Break, End of Term</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-semibold text-[var(--text)] border-r border-[var(--border)]">Term 3</td>
                    <td className="p-3 text-[var(--text-light)] border-r border-[var(--border)]">Apr 8 - Jun 14</td>
                    <td className="p-3 text-[var(--text-light)] border-r border-[var(--border)]">48 days</td>
                    <td className="p-3 text-[var(--text-light)]">Memorial Day, Final Exams</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[var(--text)] border-r border-[var(--border)]">Term 4</td>
                    <td className="p-3 text-[var(--text-light)] border-r border-[var(--border)]">Jul 8 - Aug 15</td>
                    <td className="p-3 text-[var(--text-light)] border-r border-[var(--border)]">28 days</td>
                    <td className="p-3 text-[var(--text-light)]">Summer Break Begins</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-10 text-center text-[var(--text-light)]">
          <p>© 2023 Athena Learning Center. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="#" className="hover:text-[var(--primary)] transition">Print Timetable</a>
            <a href="#" className="hover:text-[var(--primary)] transition">Download PDF</a>
            <a href="#" className="hover:text-[var(--primary)] transition">Sync to Calendar</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableComponent;
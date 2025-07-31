import { ChangeEvent, useEffect, useState } from "react";
import { TeacherSearchForm } from "../search/TeacherSearchComponent";
import { StudentForm } from "../../modal/forms/students/student";
import axios from "axios";
import { FaTrash, FaPlus, FaCheck, FaUserGraduate, FaChalkboardTeacher, FaSearch } from "react-icons/fa";
import { Subject } from "./SubjectsComponent";
interface Classroom {
  id: number;
  name: string;
  teachers: TeacherSearchForm[];
  students: StudentForm[];
}

interface ClassroomSummaries{
  classroomId : number;
  classroomName: string;
  totalStudents: number;
  totalTeachers: number;
}

export default function ClassesComponent() {
  const [formData, setFormData] = useState({ name: ""})
  const [classrooms, setClassrooms]  = useState<Classroom[]>([])
  const [allTeachers, setAllTeachers] = useState<TeacherSearchForm[]>([]) // All teachers in the system
  const [allStudents, setAllStudents] = useState<StudentForm[]>([]) // All students in the system
  const [assignedTeachers, setAssignedTeachers] = useState<TeacherSearchForm[]>([]) // Teachers assigned to selected classroom
  const [assignedStudents, setAssignedStudents] = useState<StudentForm[]>([]) // Students assigned to selected classroom
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [successClassroomId, setSuccessClassroomId] = useState<number | null>(null);
  const [selectedClassroomId, setSelectedClassroomId] = useState<number | null>(null);
  const [selectedClassroomName, setSelectedClassroomName] = useState<string | null>(null);
  const [classroomSummaries, setClassroomSummaries] = useState<ClassroomSummaries[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); 
    const [activeTab, setActiveTab] = useState('create');

    // Teacher search filters
  const [teacherNameFilter, setTeacherNameFilter] = useState("")
  const [teacherIdFilter, setTeacherIdFilter] = useState("")
  const [teacherGenderFilter, setTeacherGenderFilter] = useState("")
  const [teacherSubjectFilter, setTeacherSubjectFilter] = useState("")

  // Student search filters
  const [studentNameFilter, setStudentNameFilter] = useState("")
  const [studentDobFilter, setStudentDobFilter] = useState("")

  useEffect(() => {
    fetchAllTeachers();
    fetchAllStudents();
    fetchClassrooms();
  }, [])

  useEffect(() => {
    if (selectedClassroomId) {
      fetchAssignedTeachers();
      fetchAssignedStudents();
    }
  }, [selectedClassroomId]);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await axios.get(`http://localhost:8080/api/classroom/summary`);
      setClassroomSummaries(res.data);
    }
    if (selectedClassroomId) {
      fetchSummary();
    }
  }, [classroomSummaries])


  const ClassroomCard = ({ classroom }: { classroom: Classroom }) => {
    return (
      <div className="bg-white shadow-md rounded p-4 hover:cursor-pointer hover:shadow-gray-900" onClick={() => handleSelectClassroom(classroom.id, classroom.name)}>
        <h2 className="text-lg font-bold mb-2">{classroom.name}</h2>
        <p className="text-gray-600">Classroom ID: {classroom.id}</p>
      </div>
    );
  };

  const fetchAllTeachers = async () => {
    try {
      const res = await axios.get<TeacherSearchForm[]>(`http://localhost:8080/api/teachers`);
      setAllTeachers(res.data);
    } catch(err : any) {
      setError(err.response?.data?.message || "Failed to load teachers.")
    }
  }

  const fetchAssignedTeachers = async () => {
    try {
      const res = await axios.get<TeacherSearchForm[]>(`http://localhost:8080/api/classroom/${selectedClassroomId}/teachers`);
      setAssignedTeachers(res.data);
    } catch(err : any) {
      setError(err.response?.data?.message || "Failed to load assigned teachers.")
    }
  }

  const fetchAllStudents = async () => {
    try {
      const res = await axios.get<StudentForm[]>(`http://localhost:8080/api/students`);
      setAllStudents(res.data);
    } catch(err : any) {
      setError(err.response?.data?.message || "Failed to load students.")
    }
  }

  const fetchAssignedStudents = async () => {
    try {
      const res = await axios.get<StudentForm[]>(`http://localhost:8080/api/classroom/${selectedClassroomId}/students`);
      setAssignedStudents(res.data);
    } catch(err : any) {
      setError(err.response?.data?.message || "Failed to load assigned students.")
    }
  }

  const fetchClassrooms = async () => {
    try {
      const res = await axios.get<Classroom[]>(`http://localhost:8080/api/classroom`);
      setClassrooms(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load classrooms.");
    }
  };

   // Filter teachers based on search criteria
  const filteredTeachers = allTeachers.filter(teacher => {
    const nameMatch = teacher.displayName.toLowerCase().includes(teacherNameFilter.toLowerCase());
    const idMatch = teacherIdFilter === "" || teacher.id.toString().includes(teacherIdFilter);
    const genderMatch = teacherGenderFilter === "" || teacher.gender.toLowerCase() === teacherGenderFilter.toLowerCase();
    const subjectMatch = teacherSubjectFilter === "" || 
      teacher.subjects.some(subject => 
        subject.subjectName.toLowerCase().includes(teacherSubjectFilter.toLowerCase())
      );
    
    return nameMatch && idMatch && genderMatch && subjectMatch;
  });

   // Filter students based on search criteria
  const filteredStudents = allStudents.filter(student => {
    const nameMatch = student.displayName.toLowerCase().includes(studentNameFilter.toLowerCase());
    const dobMatch = studentDobFilter === "" || student.dob.includes(studentDobFilter);
    
    return nameMatch && dobMatch;
  });

   // Check if a teacher is already assigned
  const isTeacherAssigned = (teacherId: number) => {
    return assignedTeachers.some(teacher => teacher.id === teacherId);
  };

  // Check if a student is already assigned
  const isStudentAssigned = (studentId: number) => {
    return assignedStudents.some(student => student.id === studentId);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 

    try {
      const regResp = await axios.post(
        `http://localhost:8080/api/classroom?name=${formData.name}`, null,
        {headers: {"Content-Type": "application/json"}}
      );

      const newClassroom = regResp.data;
      setClassrooms((prev) => [...prev, newClassroom]);
      setFormData({name: ""});
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to register classroom.")
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteClassroom = async (id:number) => {
    const comfirmDelete = window.confirm(`Are you sure you want to delete this classroom?`);
    if (!comfirmDelete) return;
    try {
      await axios.delete(`http://localhost:8080/api/classroom/${id}`);
      setClassrooms(classrooms.filter(classroom => classroom.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete classroom.");
    }
  }

  const handleDeleteTeacher = async (teacherId:number) => {
    if (!selectedClassroomId) return;
    const comfirmDelete = window.confirm(`Are you sure you want to remove this teacher from the classroom?`);
    if (!comfirmDelete) return;
    try {
      await axios.delete(`http://localhost:8080/api/classroom/${selectedClassroomId}/removeTeacher/${teacherId}`);
      setAssignedTeachers(assignedTeachers.filter(teacher => teacher.id !== teacherId));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to remove teacher.");
    }
  }

  const handleDeleteStudent = async (studentId:number) => {
    if (!selectedClassroomId) return;
    const comfirmDelete = window.confirm(`Are you sure you want to remove this student from the classroom?`);
    if (!comfirmDelete) return;
    try {
      await axios.delete(`http://localhost:8080/api/classroom/${selectedClassroomId}/removeStudent/${studentId}`);
      setAssignedStudents(assignedStudents.filter(student => student.id !== studentId));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to remove student.");
    }
  }

  const handleAddStudent = async (studentId: number) => {
    if (!selectedClassroomId) return;
    try {
      await axios.put(`http://localhost:8080/api/classroom/${selectedClassroomId}/addStudent/${studentId}`);
      fetchAssignedStudents();
    } catch (err) {
      console.error("Failed to add student to classroom.", err);
    }
  }

  const handleAddTeacher = async (teacherId: number) => {
    if (!selectedClassroomId) return;
    try {
      await axios.put(`http://localhost:8080/api/classroom/${selectedClassroomId}/addTeacher/${teacherId}`);
      fetchAssignedTeachers();
    } catch (err) {
      console.error("Failed to add teacher to classroom.", err);
    }
  }

  const handleSelectClassroom = (classroomId: number, classroomName: string) => {
    setSelectedClassroomId(classroomId);
    setSelectedClassroomName(classroomName);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if(loading) return <div>Loading...</div>
  if(error) return <p className="text-red-500">{error}</p>

   return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-2">Classroom Management</h1>
        <p className="text-[var(--text-light)] max-w-2xl mx-auto">
          Create and manage classrooms, assign teachers and students
        </p>
      </div>
      
      {/* Navigation Tabs */}
      <div className="flex border-b border-[var(--border)] mb-8">
        <button
          className={`px-6 py-3 font-medium ${activeTab === 'create' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-[var(--text-light)]'}`}
          onClick={() => setActiveTab('create')}
        >
          Create Classroom
        </button>
        <button
          className={`px-6 py-3 font-medium ${activeTab === 'all' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-[var(--text-light)]'}`}
          onClick={() => setActiveTab('all')}
        >
          All Classrooms
        </button>
        <button
          className={`px-6 py-3 font-medium ${activeTab === 'manage' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-[var(--text-light)]'}`}
          onClick={() => setActiveTab('manage')}
        >
          Manage Classrooms
        </button>
      </div>

      {/* Create Classroom Tab */}
      {activeTab === 'create' && (
        <div className="bg-[var(--bg-light)] rounded-2xl shadow-lg border border-[var(--border)] p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text)]">Create New Classroom</h2>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="max-w-md">
            <div className="mb-6">
              <label className="block text-md font-medium text-[var(--text)] mb-2">Classroom Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                placeholder="Enter classroom name"
              />
            </div>
            <button
              type="submit"
              className={`px-6 py-3 bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--primary-dark)] transition flex items-center ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Classroom"
              )}
            </button>
          </form>
        </div>
      )}

      {/* All Classrooms Tab */}
      {activeTab === 'all' && (
        <div className="bg-[var(--bg-light)] rounded-2xl shadow-lg border border-[var(--border)] p-6">
          <div className="flex items-center mb-6">
            <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text)]">All Classrooms</h2>
          </div>

          {classrooms.length === 0 ? (
            <div className="text-center py-12 text-[var(--text-light)] border-2 border-dashed border-[var(--border)] rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[var(--text-light)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p>No classrooms found. Create your first classroom.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classrooms.map((classroom) => (
                <div 
                  key={classroom.id} 
                  className={`bg-[var(--bg)] rounded-xl border border-[var(--border)] p-5 relative transition hover:shadow-lg ${
                    selectedClassroomId === classroom.id ? "ring-2 ring-[var(--primary)]" : ""
                  }`}
                  onClick={() => handleSelectClassroom(classroom.id, classroom.name)}
                >
                  <button
                    className="absolute top-3 right-3 text-[var(--text-light)] hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClassroom(classroom.id);
                    }}
                    title="Delete Classroom"
                  >
                    <FaTrash />
                  </button>
                  
                  <div className="flex items-center mb-4">
                    <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text)]">{classroom.name}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[var(--bg-light)] p-3 rounded-lg">
                      <div className="flex items-center">
                        <FaChalkboardTeacher className="text-[var(--primary)] mr-2" />
                        <span className="text-sm text-[var(--text-light)]">Teachers</span>
                      </div>
                      <p className="text-lg font-bold mt-1">{classroom.teachers.length}</p>
                    </div>
                    <div className="bg-[var(--bg-light)] p-3 rounded-lg">
                      <div className="flex items-center">
                        <FaUserGraduate className="text-[var(--primary)] mr-2" />
                        <span className="text-sm text-[var(--text-light)]">Students</span>
                      </div>
                      <p className="text-lg font-bold mt-1">{classroom.students.length}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Manage Classrooms Tab */}
      {activeTab === 'manage' && (
        <div className="space-y-8">
          {/* Selected Classroom Section */}
          {selectedClassroomId ? (
            <div className="bg-[var(--bg-light)] rounded-2xl shadow-lg border border-[var(--border)] p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text)]">Managing: {selectedClassroomName}</h2>
                  <p className="text-[var(--text-light)]">Classroom ID: {selectedClassroomId}</p>
                </div>
                <button
                  className="text-[var(--text-light)] hover:text-[var(--primary)]"
                  onClick={() => {
                    setSelectedClassroomId(null);
                    setSelectedClassroomName(null);
                  }}
                >
                  Change Classroom
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Assigned Teachers */}
                <div className="bg-[var(--bg)] rounded-xl border border-[var(--border)] p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-[var(--text)] flex items-center">
                      <FaChalkboardTeacher className="text-[var(--primary)] mr-2" />
                      Assigned Teachers
                    </h3>
                    <span className="bg-[var(--primary-light)] text-[var(--primary)] px-3 py-1 rounded-full">
                      {assignedTeachers.length} teachers
                    </span>
                  </div>
                  
                  {assignedTeachers.length === 0 ? (
                    <div className="text-center py-6 text-[var(--text-light)]">
                      No teachers assigned to this classroom
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {assignedTeachers.map((teacher) => (
                        <div key={teacher.id} className="flex justify-between items-center p-3 bg-[var(--bg-light)] rounded-lg">
                          <div>
                            <h4 className="font-medium text-[var(--text)]">{teacher.displayName}</h4>
                            <p className="text-sm text-[var(--text-light)]">
                              {teacher.subjects.join(', ')}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteTeacher(teacher.id)}
                            className="text-red-500 hover:text-red-700 flex items-center"
                          >
                            <FaTrash className="mr-1" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Assigned Students */}
                <div className="bg-[var(--bg)] rounded-xl border border-[var(--border)] p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-[var(--text)] flex items-center">
                      <FaUserGraduate className="text-[var(--primary)] mr-2" />
                      Assigned Students
                    </h3>
                    <span className="bg-[var(--primary-light)] text-[var(--primary)] px-3 py-1 rounded-full">
                      {assignedStudents.length} students
                    </span>
                  </div>
                  
                  {assignedStudents.length === 0 ? (
                    <div className="text-center py-6 text-[var(--text-light)]">
                      No students assigned to this classroom
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {assignedStudents.map((student) => (
                        <div key={student.id} className="flex justify-between items-center p-3 bg-[var(--bg-light)] rounded-lg">
                          <div>
                            <h4 className="font-medium text-[var(--text)]">ID: {student.id} - {student.name}</h4>
                            <p className="text-sm text-[var(--text-light)]">{student.dob}</p>
                             <p className="text-sm text-[var(--text-light)]">{student.address}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteStudent(student.id)}
                            className="text-red-500 hover:text-red-700 flex items-center"
                          >
                            <FaTrash className="mr-1" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[var(--bg-light)] rounded-2xl shadow-lg border border-[var(--border)] p-6">
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[var(--text-light)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-xl font-bold text-[var(--text)] mb-2">Select a Classroom</h3>
                <p className="text-[var(--text-light)] mb-4">Choose a classroom from the list to manage its teachers and students</p>
                <button
                  className="text-[var(--primary)] font-medium hover:underline"
                  onClick={() => setActiveTab('all')}
                >
                  View All Classrooms
                </button>
              </div>
            </div>
          )}

          {/* Teacher and Student Assignment Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Teachers Section */}
            <div className="bg-[var(--bg-light)] rounded-2xl shadow-lg border border-[var(--border)] p-6">
              <div className="flex items-center mb-6">
                <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                  <FaChalkboardTeacher className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--text)]">Assign Teachers</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Search Teachers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-light)] mb-1">By Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Teacher name"
                        className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                        value={teacherNameFilter}
                        onChange={(e) => setTeacherNameFilter(e.target.value)}
                      />
                      <FaSearch className="absolute left-3 top-4 text-[var(--text-light)]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-light)] mb-1">By ID</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Teacher ID"
                        className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                        value={teacherIdFilter}
                        onChange={(e) => setTeacherIdFilter(e.target.value)}
                      />
                      <FaSearch className="absolute left-3 top-4 text-[var(--text-light)]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-light)] mb-1">By Gender</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Gender"
                        className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                        value={teacherGenderFilter}
                        onChange={(e) => setTeacherGenderFilter(e.target.value)}
                      />
                      <FaSearch className="absolute left-3 top-4 text-[var(--text-light)]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-light)] mb-1">By Subject</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                        value={teacherSubjectFilter}
                        onChange={(e) => setTeacherSubjectFilter(e.target.value)}
                      />
                      <FaSearch className="absolute left-3 top-4 text-[var(--text-light)]" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[var(--bg)] rounded-xl border border-[var(--border)] max-h-96 overflow-y-auto">
                {filteredTeachers.length === 0 ? (
                  <div className="text-center py-8 text-[var(--text-light)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[var(--text-light)] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>No teachers found matching your search</p>
                  </div>
                ) : (
                  filteredTeachers.map((teacher) => (
                    <div 
                      key={teacher.id} 
                      className="p-4 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--bg-light)]"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-[var(--text)]">{teacher.displayName}</h4>
                          <p className="text-sm text-[var(--text-light)]">ID: {teacher.id} | {teacher.gender}</p>
                          <p className="text-sm text-[var(--text-light)]">
                            Subjects: {teacher.subjects.map(s => s.subjectName).join(', ')}
                          </p>
                        </div>
                        <div>
                          {isTeacherAssigned(teacher.id) ? (
                            <span className="text-green-600 flex items-center">
                              <FaCheck className="mr-1" /> Added
                            </span>
                          ) : (
                            <button 
                              onClick={() => handleAddTeacher(teacher.id)}
                              className="text-[var(--primary)] hover:text-[var(--primary-dark)] flex items-center"
                              disabled={!selectedClassroomId}
                              title={!selectedClassroomId ? "Select a classroom first" : ""}
                            >
                              <FaPlus className="mr-1" /> Assign
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Students Section */}
            <div className="bg-[var(--bg-light)] rounded-2xl shadow-lg border border-[var(--border)] p-6">
              <div className="flex items-center mb-6">
                <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
                  <FaUserGraduate className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--text)]">Assign Students</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Search Students</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-light)] mb-1">By Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Student name"
                        className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                        value={studentNameFilter}
                        onChange={(e) => setStudentNameFilter(e.target.value)}
                      />
                      <FaSearch className="absolute left-3 top-4 text-[var(--text-light)]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-light)] mb-1">By Date of Birth</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="YYYY-MM-DD"
                        className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                        value={studentDobFilter}
                        onChange={(e) => setStudentDobFilter(e.target.value)}
                      />
                      <FaSearch className="absolute left-3 top-4 text-[var(--text-light)]" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[var(--bg)] rounded-xl border border-[var(--border)] max-h-96 overflow-y-auto">
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-8 text-[var(--text-light)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[var(--text-light)] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>No students found matching your search</p>
                  </div>
                ) : (
                  filteredStudents.map((student) => (
                    <div 
                      key={student.id} 
                      className="p-4 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--bg-light)]"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-[var(--text)]">{student.displayName}</h4>
                          <p className="text-sm text-[var(--text-light)]">ID: {student.id} | DOB: {student.dob}</p>
                          <p className="text-sm text-[var(--text-light)]">Address: {student.address}</p>
                        </div>
                        <div>
                          {isStudentAssigned(student.id) ? (
                            <span className="text-green-600 flex items-center">
                              <FaCheck className="mr-1" /> Added
                            </span>
                          ) : (
                            <button 
                              onClick={() => handleAddStudent(student.id)}
                              className="text-[var(--primary)] hover:text-[var(--primary-dark)] flex items-center"
                              disabled={!selectedClassroomId}
                              title={!selectedClassroomId ? "Select a classroom first" : ""}
                            >
                              <FaPlus className="mr-1" /> Assign
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
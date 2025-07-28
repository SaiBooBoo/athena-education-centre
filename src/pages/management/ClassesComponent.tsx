import { ChangeEvent, useEffect, useState } from "react"
import { TeacherSearchForm } from "../search/TeacherSearchComponent";
import { StudentForm } from "../../modal/forms/students/student";
import axios from "axios";
import { FaTrash } from "react-icons/fa6";
import { Subject } from "../../modal/dtos/student.dto";
import { FaCheck, FaEdit, FaPlus } from "react-icons/fa";

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
        subject.toLowerCase().includes(teacherSubjectFilter.toLowerCase())
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
    <>
      <div>Classroom Management</div>
      <div className="shadow-md grid grid-cols-2 gap-4 flex-col items-start justify-center min-h-screen bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg)] to-[var(--bg-light)] p-4 relative">
      
        {/* Create A new Classroom */}
        <div>
          <h1 className="text-3xl font-bold mb-4 text-[var(--text)]">Create Classroom</h1>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {successClassroomId && (
            <p className="text-green-500">Classroom created successfully! Classroom ID: {successClassroomId}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-[var(--text)] font-semibold mb-2">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button type="submit" className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-[var(--primary-dark)]">
              Create Classroom
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* Showing the Available Classrooms */}
        <div>
          <h1 className="text-3xl font-bold mb-4 text-[var(--text)]">All Classrooms</h1>
          <div className="grid grid-cols-5 gap-2">
            {classrooms.map((classroom) => (
              <div key={classroom.id} className="relative">
                <ClassroomCard classroom={classroom} />
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteClassroom(classroom.id)}
                  title="Delete Classroom"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="shadow-md grid grid-cols-2 gap-4 flex-col items-start justify-center min-h-screen bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg)] to-[var(--bg-light)] p-4 relative">
             {/* Display the Selected Classroom Section */}
        {selectedClassroomId && (
          <div className="mt-6 col-span-2">
            <h2>Classroom Name: {selectedClassroomName}</h2>
            
            {/* Assigned Teachers Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Assigned Teachers</h3>
              <p>Total Teachers: {assignedTeachers.length}</p>
              <table className="table-auto w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Gender</th>
                    <th className="border px-4 py-2">Qualification</th>
                    <th className="border px-4 py-2">DOB</th>
                    <th className="border px-4 py-2">Subjects</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{teacher.displayName}</td>
                      <td className="border px-4 py-2">{teacher.gender}</td>
                      <td className="border px-4 py-2">{teacher.qualification}</td>
                      <td className="border px-4 py-2">{teacher.dob}</td>
                      <td className="border px-4 py-2">{teacher.subjects.join(", ")}</td>
                      <td className="border px-4 py-2">
                        <button 
                          onClick={() => handleDeleteTeacher(teacher.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Assigned Students Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Assigned Students</h3>
              <p>Total Students : {assignedStudents.length}</p>
              <table className="table-auto w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Address</th>
                    <th className="border px-4 py-2">Date of Birth</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{student.name}</td>
                      <td className="border px-4 py-2">{student.address}</td>
                      <td className="border px-4 py-2">{student.dob}</td>
                      <td className="border px-4 py-2">
                        <button 
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </div>

        <div>
                      {/* All Teachers Section with Search */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">All Teachers</h3>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Search by Name</label>
                  <input
                    type="text"
                    placeholder="Teacher name"
                    className="w-full p-2 border rounded"
                    value={teacherNameFilter}
                    onChange={(e) => setTeacherNameFilter(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Search by ID</label>
                  <input
                    type="text"
                    placeholder="Teacher ID"
                    className="w-full p-2 border rounded"
                    value={teacherIdFilter}
                    onChange={(e) => setTeacherIdFilter(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Search by Gender</label>
                  <input
                    type="text"
                    placeholder="Gender"
                    className="w-full p-2 border rounded"
                    value={teacherGenderFilter}
                    onChange={(e) => setTeacherGenderFilter(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Search by Subject</label>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full p-2 border rounded"
                    value={teacherSubjectFilter}
                    onChange={(e) => setTeacherSubjectFilter(e.target.value)}
                  />
                </div>
              </div>
              <table className="table-auto w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Qualification</th>
                    <th className="border px-4 py-2">DOB</th>
                    <th className="border px-4 py-2">Subjects</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{teacher.id}</td>
                      <td className="border px-4 py-2">{teacher.displayName}</td>
                      <td className="border px-4 py-2">{teacher.gender}</td>
                      <td className="border px-4 py-2">{teacher.qualification}</td>
                      <td className="border px-4 py-2">{teacher.dob}</td>
                      <td className="border px-4 py-2">{teacher.subjects.join(", ")}</td>
                      <td className="border px-4 py-2">
                        {isTeacherAssigned(teacher.id) ? (
                          <span className="text-green-500 flex items-center">
                            <FaCheck className="mr-1" /> Added
                          </span>
                        ) : (
                          <button 
                            onClick={() => handleAddTeacher(teacher.id)}
                            className="text-blue-500 hover:text-blue-700 flex items-center"
                          >
                            <FaPlus className="mr-1" /> Add
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* All Students Section with Search */}
            <div>
              <h3 className="text-xl font-bold mb-4">All Students</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Search by Name</label>
                  <input
                    type="text"
                    placeholder="Student name"
                    className="w-full p-2 border rounded"
                    value={studentNameFilter}
                    onChange={(e) => setStudentNameFilter(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Search by DOB</label>
                  <input
                    type="text"
                    placeholder="Date of Birth"
                    className="w-full p-2 border rounded"
                    value={studentDobFilter}
                    onChange={(e) => setStudentDobFilter(e.target.value)}
                  />
                </div>
              </div>
              <table className="table-auto w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Address</th>
                    <th className="border px-4 py-2">Date of Birth</th>
                    <th className="border px-4 py-2">Classroom</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{student.id}</td>
                      <td className="border px-4 py-2">{student.displayName}</td>
                      <td className="border px-4 py-2">{student.address}</td>
                      <td className="border px-4 py-2">{student.dob}</td>
                      <td className="border px-4 py-2">{student.classroomName}</td>
                      <td className="border px-4 py-2">
                        {isStudentAssigned(student.id) ? (
                          <span className="text-green-500 flex items-center">
                            <FaCheck className="mr-1" /> Added
                          </span>
                        ) : (
                          <button 
                            onClick={() => handleAddStudent(student.id)}
                            className="text-blue-500 hover:text-blue-700 flex items-center"
                          >
                            <FaPlus className="mr-1" /> Add
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
       
      </div>
    </>
  )
}
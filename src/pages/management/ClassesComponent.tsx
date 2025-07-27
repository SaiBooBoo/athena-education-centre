import { ChangeEvent, useEffect, useState } from "react"
import { TeacherSearchForm } from "../search/TeacherSearchComponent";
import { StudentForm } from "../../modal/forms/students/student";
import axios from "axios";
import { FaTrash } from "react-icons/fa6";


interface Classroom {
  id: number;
  name: string;
}

export default function ClassesComponent() {
  const [formData, setFormData] = useState({ name: ""})
  const [classrooms, setClassrooms]  = useState<Classroom[]>([])
  const [teachers, setTeachers] = useState<TeacherSearchForm[]>([])
  const [students, setStudents] = useState<StudentForm[]>([])
  const [filteredTeachers, setFilteredTeachers] = useState<TeacherSearchForm[]>([])
  const [filteredStudents, setFilteredStudents] = useState<StudentForm[]>([])
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [assignedStudents, setAssignedStudents] = useState<StudentForm[]>([]);
  const [assignedTeachers, setAssignedTeachers] = useState<TeacherSearchForm[]>([]);
  const [successClassroomId, setSuccessClassroomId] = useState<number | null>(null);
  const [selectedClassroomId, setSelectedClassroomId] = useState<number | null>(null);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    fetchTeachers();
    fetchStudents();
    fetchClassrooms();
  }, [])

   useEffect(() => {
    const filtered = teachers.filter((teacher) => {
      return (
        teacher.displayName.toLowerCase().includes(searchName.toLowerCase()) &&
        (searchId === "" || teacher.id.toString().includes(searchId.toString()))
      );
    });
    setFilteredTeachers(filtered);
  }, [searchName, searchId, teachers]);

  useEffect(() => {
    const filtered = students.filter((student) => {
      return (
        student.displayName.toLowerCase().includes(searchName.toLowerCase()) &&
        (searchId === "" || student.grade.toString().includes(searchId.toString()))
      )
    })
    setFilteredStudents(filtered);
  }, [searchName, searchId, students])

  const ClassroomCard = ({ classroom }: { classroom: Classroom }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-lg font-bold mb-2">{classroom.name}</h2>
      <p className="text-gray-600">Classroom ID: {classroom.id}</p>
    </div>
  );
};
  const fetchTeachers = async () => {
   try {
      const res = await axios.get<TeacherSearchForm[]>(`http://localhost:8080/api/teachers`);
      setTeachers(res.data);
      setFilteredTeachers(res.data);

    } catch(err : any) {
      setError(err.response?.data?.message || "Failed to load teachers.")
    }
  }

  const fetchStudents = async () => {
    try {
      const res = await axios.get<StudentForm[]>(`http://localhost:8080/api/students`);
      setStudents(res.data);
      setFilteredStudents(res.data);
    } catch(err : any) {
      setError(err.response?.data?.message || "Failed to load students.")
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

  const handleDeleteTeacher = async (id:number) => {
    const comfirmDelete = window.confirm(`Are you sure you want to delete this teacher?`);
    if (!comfirmDelete) return;
    try {
      await axios.delete(`http://localhost:8080/api/classroom/${id}/removeTeacher/${teachers.find(teacher => teacher.id === id)?.id}`);
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete teacher.");
    }
  }

  const handleDeleteStudent = async (id:number) => {
    const comfirmDelete = window.confirm(`Are you sure you want to delete this student?`);
    if (!comfirmDelete) return;
    try {
      await axios.delete(`http://localhost:8080/api/classroom/${id}/removeStudent/${students.find(student => student.id === id)?.id}`);
      setStudents(students.filter(student => student.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete student.");
    }
  }

  const handleAddStudent = async (studentId: number, classroomId:number) => {
    try{
      await axios.put(`http://localhost:8080/api/classroom/${classroomId}/addStudent/${studentId}`);
      if(selectedStudentId) {
        const res = await axios.get<StudentForm[]>
        (`http://localhost:8080/api/students`);
        setAssignedStudents(res.data)
      }
    } catch (err) {
      console.error("Failed to add student to classroom.", err);
    }
  }

  const handleAddTeacher = async (teacherId: number, classroomId: number) => {
    try{
      await axios.put(`http://localhost:8080/api/classroom/${classroomId}/addTeacher/${teacherId}`);
      if(selectedTeacherId) {
        const res = await axios.get<TeacherSearchForm[]>
        (`http://localhost:8080/api/teachers`);
        setAssignedTeachers(res.data)
      }
    } catch (err) {
      console.error("Failed to add teacher to classroom.", err);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if(loading) return <div>Loading...</div>
  if(error) return <p className="text-red-500">{error}</p>

  return (
    <>
       <div>ClassesComponent</div>
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
          onClick={() => {
           handleDeleteClassroom(classroom.id)
          }}
          title="Delete Classroom"
              >
          <FaTrash />
              </button>
            </div>
          ))}
        </div>
       </div>
       
       {/* Selected Classroom Display */}
      {selectedClassroomId && (

      )}

      </div>

    </>
 
  )
}

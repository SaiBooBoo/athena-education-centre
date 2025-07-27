import { useEffect, useState } from "react"
import { TeacherSearchForm } from "../search/TeacherSearchComponent";
import { StudentForm } from "../../modal/forms/students/student";
import axios from "axios";


interface Classroom{
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
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    fetchTeachers();
    fetchStudents();
  })

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


  return (
    <>
       <div>ClassesComponent</div>

       
    </>
 
  )
}

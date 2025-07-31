import { useEffect, useState } from "react";
import axios from "axios";
import { Gender } from "../../modal/dtos/student.dto";
import { 
  FaChalkboardTeacher,
  FaEdit,
  FaCalendarAlt,
  FaMale,
  FaFemale,
  FaPhone,
  FaIdCard
} from 'react-icons/fa';
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export interface TeacherSearchForm {
  id: number;
  displayName: string;
  nrcNumber: string;
  qualification: string;
  dob: string;
  phoneNumber: string;
  gender: Gender;
  profileImagePath: string | null;
  subjects:Subject[];
}

type Subject = {
  id: number;
  subjectName: string;
};

export default function TeacherSearchComponent() {
  const [teachers, setTeachers] = useState<TeacherSearchForm[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<TeacherSearchForm[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [searchGender, setSearchGender] = useState<Gender | "">("");
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BACKEND_URL = "http://localhost:8080/api";

  useEffect(() => {
    axios
      .get<TeacherSearchForm[]>(`${BACKEND_URL}/teachers`)
      .then(res => {
        setTeachers(res.data);
        setFilteredTeachers(res.data);
      })
      .catch(err => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));

    axios
      .get<Subject[]>(`${BACKEND_URL}/subjects`)
      .then(res => {
        console.log("SUBJECTS PAYLOAD:", res.data);
        setSubjects(res.data.map(s => s.subjectName));
      })
      .catch(err => setError(err.message || "Unknown error"));
  }, []);

  useEffect(() => {
    if (!selectedSubject) {
      setFilteredTeachers(teachers);
    } else {
      axios
        .get<TeacherSearchForm[]>(
          `${BACKEND_URL}/teachers/by-subject?subjectName=${selectedSubject}`
        )
        .then(res => setFilteredTeachers(res.data))
        .catch(err => setError(err.message || "Unknown error"));
    }
  }, [selectedSubject, teachers]);

  const searchFiltered = filteredTeachers.filter(t => {
    if (searchName && !t.displayName.toLowerCase().includes(searchName.toLowerCase()))
      return false;
    if (searchId !== "" && t.id !== searchId) return false;
    if (searchGender !== "" && t.gender !== searchGender) return false;
    return true;
  });

  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (loading) return <p>Loading ...</p>;

  return (

     <div className="min-h-screen p-4 md:p-8 bg-[var(--bg)] text-[var(--text)]">
  <div className="max-w-8xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--primary)] border-b border-[var(--border)] pb-3">
      Teacher Search
    </h2>

    {/* Filters */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-[var(--bg-light)] p-4 rounded-xl border border-[var(--border-muted)] shadow-sm">
      <input
        type="text"
        placeholder="Search Name…"
        value={searchName}
        onChange={e => setSearchName(e.target.value)}
        className="bg-[var(--bg-light)] border border-[var(--border-muted)] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent placeholder:text-[var(--text-muted)] transition-all"
      />
      <input
        type="number"
        placeholder="Search ID…"
        value={searchId}
        onChange={e =>
          setSearchId(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="bg-[var(--bg-light)] border border-[var(--border-muted)] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent placeholder:text-[var(--text-muted)] transition-all"
      />
      <select
        value={searchGender}
        onChange={e => setSearchGender(e.target.value as Gender)}
        className="bg-[var(--bg-light)] border border-[var(--border-muted)] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent text-[var(--text)] appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_1rem_center]"
      >
        <option value="">All Genders</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>
      <select
        value={selectedSubject}
        onChange={e => setSelectedSubject(e.target.value)}
        className="bg-[var(--bg-light)] border border-[var(--border-muted)] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent text-[var(--text)] appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_1rem_center]"
      >
        <option value="">All Subjects</option>
        {subjects.map(sub => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>

       <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate("/registerTeacher")}
                    className="flex items-center bg-[var(--bg-light)] border border-[var(--border-muted)] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent placeholder:text-[var(--text-muted)] transition-all hover:bg-[var(--bg)] hover:text-[var(--primary)]"
                  >
                    <FaUserPlus className="mr-2" /> Register Teacher
                  </button>
                </div>
              
    </div>

    {error ? (
      <div className="bg-[var(--danger)]/20 border border-[var(--danger)] text-[var(--danger)] p-4 rounded-lg text-center">
        Error: {error}
      </div>
    ) : loading ? (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    ) : searchFiltered.length === 0 ? (
      <div className="text-center py-12 bg-[var(--bg-light)] rounded-xl border border-[var(--border)]">
       <div className="flex justify-center mb-4">
           <FaChalkboardTeacher className="text-5xl text-[var(--text-muted)]" />
       </div>
        <p className="text-xl text-[var(--text-muted)]">No teachers match your filters</p>
      </div>
    ) : (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {searchFiltered.map(teacher => (
          <div
            key={teacher.id}
            className="bg-[var(--bg-light)] rounded-2xl overflow-hidden flex flex-col border border-[var(--border)] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-48 bg-[var(--bg)] flex-shrink-0 relative">
              {teacher.profileImagePath ? (
                <img
                  src={`${BACKEND_URL}/teachers/${teacher.id}/image`}
                  alt={teacher.displayName}
                  className="object-cover h-full w-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[var(--text-muted)] bg-gradient-to-br from-[var(--bg-dark)] to-[var(--bg)]">
                  <div className="text-6xl opacity-50">
                    <FaChalkboardTeacher />
                  </div>
                </div>
              )}
              <div className="absolute top-3 right-3 bg-[var(--primary)] text-white text-sm font-medium px-3 py-1 rounded-full">
                #{teacher.id}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[var(--primary)] max-w-[80%]">
                  {teacher.displayName}
                </h3>
                <button onClick={() => navigate(`/edit-teacher/${teacher.id}`)}
                  className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors"
                  title="Edit teacher"
                >
                  <FaEdit />
                </button>
              </div>
              
              <div className="grid gap-2 mb-3 text-sm">
                <div className="flex items-center">
                  <span className="icon mr-2 text-[var(--text-muted)]">
                    <FaCalendarAlt />
                  </span>
                  <span>{teacher.dob}</span>
                </div>
                <div className="flex items-center">
                  <span className="icon mr-2 text-[var(--text-muted)]">
                    {teacher.gender === 'MALE' ? <FaMale /> : <FaFemale />}
                  </span>
                  <span>{teacher.gender}</span>
                </div>
                <div className="flex items-center">
                  <span className="icon mr-2 text-[var(--text-muted)]">
                    <FaPhone />
                  </span>
                  <span>{teacher.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <span className="icon mr-2 text-[var(--text-muted)]">
                    <FaIdCard />
                  </span>
                  <span>{teacher.nrcNumber}</span>
                </div>
              </div>
              
              <div className="mt-auto space-y-2 pt-3 border-t border-[var(--border-muted)]">
                <p className="font-medium text-[var(--text-muted)]">Qualification:</p>
                <p className="bg-[var(--bg-dark)] p-2 rounded-lg">{teacher.qualification}</p>
                
                <p className="font-medium text-[var(--text-muted)]">Subjects:</p>
                <div className="flex flex-wrap gap-2">
                  {(teacher.subjects || []).map((subject, idx) => (
                    <span 
                      key={idx} 
                      className="bg-[var(--info)]/20 text-[var(--info)] border border-[var(--info)]/30 text-xs px-2 py-1 rounded-full"
                    >
                      {subject.subjectName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  );
}



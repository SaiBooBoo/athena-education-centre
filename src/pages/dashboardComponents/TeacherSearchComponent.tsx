import { useEffect, useState } from "react";
import axios from "axios";
import { Gender } from "../../modal/dtos/student.dto";

interface TeacherSearchForm {
  id: number;
  displayName: string;
  nrcNumber: string;
  qualification: string;
  dob: string;
  phone: string;
  gender: Gender;
  profileImagePath: string | null;
  subjects:string[];
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
    <div>
      <h2 className="text-2xl font-bold mb-6">Teacher Dashboard</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search Name…"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Search ID…"
          value={searchId}
          onChange={e =>
            setSearchId(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="border rounded px-3 py-2"
        />
        <select
          value={searchGender}
          onChange={e => setSearchGender(e.target.value as Gender)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Genders</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
        <select
          value={selectedSubject}
          onChange={e => setSelectedSubject(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Subjects</option>
          {subjects.map(sub => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {searchFiltered.length === 0 ? (
        <p className="text-center text-gray-500">No teachers match your filters</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {searchFiltered.map(teacher => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              <div className="h-48 bg-gray-100 flex-shrink-0">
                {teacher.profileImagePath ? (
                  <img
                    src={`${BACKEND_URL}/teachers/${teacher.id}/image`}
                    alt={teacher.displayName}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{teacher.displayName}</h3>
                <p>ID: {teacher.id}</p>
                <p>DOB: {teacher.dob}</p>
                <p>Gender: {teacher.gender}</p>
                <p>Phone: {teacher.phone}</p>
                <p>NRC: {teacher.nrcNumber}</p>
                <p>Qualification: {teacher.qualification}</p>
                <p className="mt-2">
                  <span className="font-medium">Subjects:</span>{" "}
                     {(teacher.subjects || []).join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



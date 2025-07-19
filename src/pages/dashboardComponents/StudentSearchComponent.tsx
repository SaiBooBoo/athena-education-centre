import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import type { Gender } from "../../modal/dtos/student.dto";
import {motion} from "framer-motion";
import { ParentSummaryDto } from "../../modal/dtos/dtos";
type Student = {
  id: number;
  displayName: string;
  gender: string;
  dob: string;
  address: string;
  grade: number;
  profileImagePath: string | null;
  parents: ParentSummaryDto[]
};

export default function StudentSearchComponent() {
  const [students,   setStudents]   = useState<Student[]>([]);
  const [error,      setError]      = useState<string | null>(null);
  const [loading,    setLoading]    = useState(true);

  const [searchName,  setSearchName]  = useState('');
  const [searchId,    setSearchId]    = useState<number | ''>('');
  const [searchGrade, setSearchGrade] = useState<number | ''>('');
  const [searchGender, setSearchGender] = useState<Gender | ''>('');

  const BACKEND_URL = 'http://localhost:8080/api/students';

  // Fetch once on mount
  useEffect(() => {
    setLoading(true);
    axios.get<Student[]>(BACKEND_URL)
      .then(res => setStudents(res.data))
      .catch(err => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, []);

  if (error)   return <div>Error: {error}</div>;
  if (loading) return <motion.p animate={{ y: [0, -4, 0] }}
  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} >Loading ...</motion.p>;

  // Apply filters
  const filtered = students.filter(s => {
    if (searchName && !s.displayName.toLowerCase().includes(searchName.toLowerCase()))
      return false;
    if (searchId !== '' && s.id !== searchId)
      return false;
    if (searchGrade !== '' && s.grade !== searchGrade)
      return false;
    if (searchGender !== '' && s.gender !== searchGender)
      return false;
    return true;
  });

  return (
    <div>
      <h2>Student Dashboard</h2>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Name…"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Search ID..."
          value={searchId}
          onChange={e => setSearchId(e.target.value === '' ? '' : Number(e.target.value))}
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Search Grade..."
          value={searchGrade}
          onChange={e => setSearchGrade(e.target.value === '' ? '' : Number(e.target.value))}
          className="border rounded px-3 py-2"
        />
        <select
          value={searchGender}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSearchGender(e.target.value as Gender | '')
          }
          className="border rounded px-3 py-2"
        >
          <option value="">All Genders</option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No students match your filters</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(s => (
            <div key={s.id} className="bg-white rounded-2xl shadow-lg">
              <div className="h-48 bg-gray-100">
                {s.profileImagePath ? (
                  <img
                    src={`${BACKEND_URL}/${s.id}/profile-image`}
                    alt={s.displayName}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{s.displayName}</h2>
                   <p className="text-gray-500">ID: {s.id}</p>
                   <p className="text-gray-500">Gender: {s.gender}</p>
                   <p className="text-gray-500">DOB: {s.dob}</p>
                  <p className="text-gray-500">Address: {s.address}</p>
                   <p className="text-gray-500">Grade: {s.grade}</p>
                   <p className="text-gray-500">Parent: {s.parents.map(p => p.displayName).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

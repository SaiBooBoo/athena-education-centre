import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import type { Gender } from "../../modal/dtos/student.dto";
import { motion } from "framer-motion";
import { ParentSummaryDto } from "../../modal/dtos/dtos";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

type Student = {
  id: number;
  displayName: string;
  gender: string;
  dob: string;
  address: string;
  grade: number;
  profileImagePath: string | null;
  parents: ParentSummaryDto[];
};

export default function StudentSearchComponent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState<number | ''>('');
  const [searchGrade, setSearchGrade] = useState<number | ''>('');
  const [searchGender, setSearchGender] = useState<Gender | ''>('');

  const BACKEND_URL = 'http://localhost:8080/api/students';
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios.get<Student[]>(BACKEND_URL)
      .then(res => setStudents(res.data))
      .catch(err => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, []);

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
    <div className="min-h-screen p-4 md:p-8 bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--primary)] border-b border-[var(--border)] pb-3">
          Student Search
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
            placeholder="Search ID..."
            value={searchId}
            onChange={e => setSearchId(e.target.value === '' ? '' : Number(e.target.value))}
            className="bg-[var(--bg-light)] border border-[var(--border-muted)] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent placeholder:text-[var(--text-muted)] transition-all"
          />
          <input
            type="number"
            placeholder="Search Grade..."
            value={searchGrade}
            onChange={e => setSearchGrade(e.target.value === '' ? '' : Number(e.target.value))}
            className="bg-[var(--bg-light)] border border-[var(--border-muted)] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent placeholder:text-[var(--text-muted)] transition-all"
          />
          <select
            value={searchGender}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSearchGender(e.target.value as Gender | '')
            }
            className="bg-[var(--bg-light)] border border-[var(--border-muted)] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent text-[var(--text)] appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_1rem_center]"
          >
            <option value="">All Genders</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>

          
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/registerStudent")}
                className="flex items-center bg-[var(--bg-light)] border border-[var(--border-muted)] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent placeholder:text-[var(--text-muted)] transition-all hover:bg-[var(--bg)] hover:text-[var(--primary)]"
              >
                <FaUserPlus className="mr-2" /> Register Student
              </button>
            </div>
          
        </div>

        {/* Results */}
        {error ? (
          <div className="bg-[var(--danger)]/20 border border-[var(--danger)] text-[var(--danger)] p-4 rounded-lg text-center">
            Error: {error}
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"
            ></motion.div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 bg-[var(--bg-light)] rounded-xl border border-[var(--border)]">
            <div className="text-5xl mb-4 text-[var(--text-muted)]">👨‍🎓</div>
            <p className="text-xl text-[var(--text-muted)]">No students match your filters</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {filtered.map(s => (
              <div 
                key={s.id} 
                className="bg-[var(--bg-light)] rounded-2xl overflow-hidden flex flex-col border border-[var(--border)] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 bg-[var(--bg)] flex-shrink-0 relative">
                  {s.profileImagePath ? (
                    <img
                      src={`${BACKEND_URL}/${s.id}/profile-image`}
                      alt={s.displayName}
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[var(--text-muted)] bg-gradient-to-br from-[var(--bg-dark)] to-[var(--bg)]">
                      <div className="text-6xl opacity-50">
                        {s.gender === 'MALE' ? '👦' : s.gender === 'FEMALE' ? '👧' : '👤'}
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-[var(--primary)] text-white text-sm font-medium px-3 py-1 rounded-full">
                    #{s.id}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[var(--primary)] max-w-[80%]">
                      {s.displayName}
                    </h3>
                    <Link to={`/edit-student/${s.id}`} title="Edit student">
                      <button className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div className="flex items-center">
                      <span className="icon mr-2 text-[var(--text-muted)]">📅</span>
                      <span>{s.dob}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="icon mr-2 text-[var(--text-muted)]">
                        {s.gender === 'MALE' ? '♂' : '♀'}
                      </span>
                      <span>{s.gender}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="icon mr-2 text-[var(--text-muted)]">🏠</span>
                      <span>{s.address}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="icon mr-2 text-[var(--text-muted)]">📚</span>
                      <span>Grade {s.grade}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto space-y-2 pt-3 border-t border-[var(--border-muted)]">
                    <p className="font-medium text-[var(--text-muted)] flex items-center">
                      <span className="icon mr-2">👪</span> Parents:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {s.parents.map(parent => (
                        <span 
                          key={parent.id} 
                          className="bg-[var(--info)]/20 text-[var(--info)] border border-[var(--info)]/30 text-xs px-2 py-1 rounded-full"
                        >
                          {parent.displayName}
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
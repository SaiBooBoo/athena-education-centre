import { ChangeEvent, useEffect, useState } from "react";
import { ParentType } from "../../modal/dtos/parent.dto";
import { Gender, Student } from "../../modal/dtos/student.dto";
import { BACKEND_URL } from "../../service/ParentService";
import axios from "axios";
import { 
  FaUsers,
  FaMale,
  FaFemale,
  FaUser,
  FaEdit,
  FaCalendarAlt,
  FaPhone,
  FaIdCard,
  FaBriefcase,
  FaHome,
  FaUserTag,
  FaChild,
  FaUserPlus
} from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

type Parent = {
  id: number;
  displayName: string;
  nrcNumber: string;
  dob: string;
  job: string;
  gender: Gender;
  phoneNumber: string;
  address: string;
  profileImagePath: string | null;
  parentType: ParentType;
  students: Student[];
};

export default function ParentSearchComponent() {
  const [parents, setParents] = useState<Parent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState<number | ''>('');
  const [searchParentType, setSearchParentType] = useState<ParentType | ''>('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get<Parent[]>(`${BACKEND_URL}`)
      .then(res => setParents(res.data))
      .catch(err => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = parents.filter(p => {
    if (searchName && !p.displayName.toLowerCase().includes(searchName.toLowerCase()))
      return false;
    if (searchId !== '' && p.id !== searchId)
      return false;
    if (searchParentType !== '' && p.parentType !== searchParentType)
      return false;
    return true;
  });

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[var(--bg)] text-[var(--text)]">
  <div className="max-w-8xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--primary)] border-b border-[var(--border)] pb-3">
      Parent Search
    </h2>

    {/* Filters */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-[var(--bg-light)] p-4 rounded-xl border border-[var(--border-muted)] shadow-sm">
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
        onChange={e => setSearchId(e.target.value === "" ? "" : Number(e.target.value))}
        className="bg-[var(--bg-light)] border border-[var(--border-muted)] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent placeholder:text-[var(--text-muted)] transition-all"
      />
      <select 
        value={searchParentType} 
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSearchParentType(e.target.value as ParentType)} 
        className="bg-[var(--bg-light)] border border-[var(--border-muted)] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent text-[var(--text)] appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_1rem_center]"
      >
        <option value="">All Parent Types</option>
        <option value="FATHER">Father</option>
        <option value="MOTHER">Mother</option>
        <option value="GUARDIAN">Guardian</option>
      </select>

       <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/registerParent")}
              className="flex items-center bg-[var(--bg-light)] border border-[var(--border-muted)] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent placeholder:text-[var(--text-muted)] transition-all hover:bg-[var(--bg)] hover:text-[var(--primary)]"
            >
              <FaUserPlus className="mr-2" /> Register Parent
            </button>
          </div>
        </div>
    </div>
    

    {/* Results */}
    {error ? (
      <div className="bg-[var(--danger)]/20 border border-[var(--danger)] text-[var(--danger)] p-4 rounded-lg text-center">
        Error: {error}
      </div>
    ) : loading ? (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    ) : filtered.length === 0 ? (
      <div className="text-center py-12 bg-[var(--bg-light)] rounded-xl border border-[var(--border)]">
        <div className="text-5xl mb-4 text-[var(--text-muted)]">
          <FaUsers />
        </div>
        <p className="text-xl text-[var(--text-muted)]">No parents match your filters</p>
      </div>
    ) : (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {filtered.map(p => (
          <div 
            key={p.id} 
            className="bg-[var(--bg-light)] rounded-2xl overflow-hidden flex flex-col border border-[var(--border)] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-48 bg-[var(--bg)] flex-shrink-0 relative">
              {p.profileImagePath ? (
                <img
                  src={`${BACKEND_URL}/${p.id}/image`}
                  alt={p.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[var(--text-muted)] bg-gradient-to-br from-[var(--bg-dark)] to-[var(--bg)]">
                  <div className="text-6xl opacity-50">
                    {p.gender === 'MALE' ? <FaMale /> : p.gender === 'FEMALE' ? <FaFemale /> : <FaUser />}
                  </div>
                </div>
              )}
              <div className="absolute top-3 right-3 bg-[var(--primary)] text-white text-sm font-medium px-3 py-1 rounded-full">
                #{p.id}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[var(--primary)] max-w-[80%]">
                  {p.displayName}
                </h3>
                <Link to={`/edit-parent/${p.id}`} title="Edit parent">
                  <button className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors">
                    <FaEdit />
                  </button>
                </Link>
                
              </div>
              
              <div className="grid gap-2 mb-3 text-sm">
                <div className="flex items-center">
                  <span className="icon mr-2 text-[var(--text-muted)]">
                    <FaCalendarAlt />
                  </span>
                  <span>{p.dob}</span>
                </div>
                <div className="flex items-center">
                  <span className="icon mr-2 text-[var(--text-muted)]">
                    {p.gender === 'MALE' ? <FaMale /> : <FaFemale />}
                  </span>
                  <span>{p.gender}</span>
                </div>
                <div className="flex items-center">
                  <span className="icon mr-2 text-[var(--text-muted)]">
                    <FaPhone />
                  </span>
                  <span>{p.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <span className="icon mr-2 text-[var(--text-muted)]">
                    <FaIdCard />
                  </span>
                  <span>{p.nrcNumber}</span>
                </div>
              </div>
              
              <div className="mt-auto space-y-2 pt-3 border-t border-[var(--border-muted)]">
                <div className="flex items-center">
                  <span className="icon mr-2 text-[var(--text-muted)]">
                    <FaBriefcase />
                  </span>
                  <span className="font-medium">Job:</span>
                  <span className="ml-1">{p.job}</span>
                </div>
                
                <div className="flex items-start">
                  <span className="icon mr-2 text-[var(--text-muted)]">
                    <FaHome />
                  </span>
                  <span className="font-medium">Address:</span>
                  <span className="ml-1 flex-1">{p.address}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="icon mr-2 text-[var(--text-muted)]">
                    <FaUserTag />
                  </span>
                  <span className="font-medium">Relation:</span>
                  <span className="ml-1 bg-[var(--primary)]/20 text-[var(--primary)] px-2 py-1 rounded-full text-xs">
                    {p.parentType}
                  </span>
                </div>
                
                <div className="mt-2">
                  <p className="font-medium text-[var(--text-muted)] flex items-center">
                    <span className="icon mr-2">
                      <FaChild />
                    </span> 
                    Children:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {p.students.map(student => (
                      <span 
                        key={student.id} 
                        className="bg-[var(--success)]/20 text-[var(--success)] border border-[var(--success)]/30 text-xs px-2 py-1 rounded-full"
                      >
                        {student.displayName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  );
}
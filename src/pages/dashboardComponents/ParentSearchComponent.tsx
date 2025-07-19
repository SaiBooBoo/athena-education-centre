import { ChangeEvent, useEffect, useState } from "react";
import { ParentType } from "../../modal/dtos/parent.dto";
import { Gender, Student } from "../../modal/dtos/student.dto";
import { BACKEND_URL } from "../../service/ParentService";
import axios from "axios";



type Parent = {
  id: number;
  displayName: string;
  nrcNumber: string;
  dob: string; // in 'YYYY-MM-DD' format
  job: string;
  gender: Gender;
  phoneNumber: string;
  address: string;
  profileImagePath: string | null;
  parentType: ParentType;
  students: Student[]
};

export default function ParentSearchComponent(){
  const [parents, setParents] = useState<Parent[]>([]);
  const [error, setError] = useState<string | null> (null);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState<number | ''>('');
  const [searchParentType, setSearchParentType] = useState<ParentType | ''>('');

  useEffect(() => {
    setLoading(true);
    axios.get<Parent[]>(`${BACKEND_URL}`)
      .then(res => setParents(res.data))
      .catch(err => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  },[]);

  if (error) return <div>Error: {error}</div>
  if (loading) return <p style={{ animation: "bounce 1s infinite ease-in-out", display: "inline-block" }}>Loading ...</p>

  const filtered = parents.filter(p => {
    if (searchName && !p.displayName.toLowerCase().includes(searchName.toLowerCase()))
      return false;
    if (searchId !== '' && p.id !== searchId)
      return false;
    if (searchParentType !== '' && p.parentType !== searchParentType)
      return false;
    return true;
  })

  return (
    <div>
      <h2>Parent Dashboard</h2>

      {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Name…"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input type="number" 
        placeholder="Search Id…" 
        value={searchId} 
        onChange={e => setSearchId(e.target.value === "" ? "" : Number(e.target.value)) }
          className="border rounded px-3 py-2"></input>
        <select value={searchParentType} onChange={(e : ChangeEvent<HTMLSelectElement>) => setSearchParentType(e.target.value as ParentType)} className="border rounded px-3 py-2">
          <option value="">All Parent Types</option>
          <option value="FATHER">Father</option>
          <option value="MOTHER">Mother</option>
          <option value="GUARDIAN">Guardian</option>
        </select>
        </div>


      {/* Results */}
      {filtered.length ===0 ? (
         <p className="text-center text-gray-500">No parents match your filters</p>
      ): (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(p => (
            <div key={p.id} className="bg-white rounded-2xl shadow-lg">
              <div className="h-48 bg-gray-100">
                {p.profileImagePath ? (
                  <img
                     src={`${BACKEND_URL}/${p.id}/image`}
                     alt={p.displayName}
                      className="w-full h-full object-cover rounded-t-2xl"/>
                ): (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
                <div className="p-4">
                   <h2 className="text-lg text-bold font-semibold">{p.displayName}</h2>
                <p className="text-gray-500">ID: {p.id}</p>
                <p className="text-gray-500">Nrc Number: {p.nrcNumber}</p>
                 <p className="text-gray-500">Date of Birth: {p.dob}</p>
                 <p className="text-gray-500">Gender: {p.gender}</p>
                  <p className="text-gray-500">Job: {p.job}</p>
                   <p className="text-gray-500">Address: {p.address}</p>
                     <p className="text-gray-500">Relation: {p.parentType}</p>
                      <p className="text-gray-500">Phone : {p.phoneNumber}</p>
                      <p className="text-gray-500">Children: {p.students.map(p =>  p.displayName).join(", ")}</p>
                </div>
            </div>
          ))}
          
        </div>
      )}
    </div>
  )
}
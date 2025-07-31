import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { TeacherSearchForm } from "../search/TeacherSearchComponent";

export interface Subject {
  id: number;
  subjectName: string;
}

export default function SubjectsComponent() {
  // Existing state declarations remain unchanged
  const [formData, setFormData] = useState({ subjectName: "" });
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<TeacherSearchForm[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<TeacherSearchForm[]>([]);
  const [assignedSubjects, setAssignedSubjects] = useState<Subject[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successSubjectId, setSuccessSubjectId] = useState<number | null>(null);
  
  const BACKEND_URL = "http://localhost:8080/api/subjects";

  // Existing useEffect hooks and functions remain unchanged
  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
  }, []);

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
    if (selectedTeacherId) {
      axios
        .get<Subject[]>(`http://localhost:8080/api/teachers/subjects/${selectedTeacherId}`)
        .then((res) => setAssignedSubjects(res.data))
        .catch(() => setAssignedSubjects([]));
    }
  }, [selectedTeacherId]);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get<TeacherSearchForm[]>(`http://localhost:8080/api/teachers`);
      setTeachers(res.data);
      setFilteredTeachers(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load teachers.");
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(BACKEND_URL);
      setSubjects(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load subjects.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const regResp = await axios.post(
        `${BACKEND_URL}?subjectName=${formData.subjectName}`,
        null,
        { headers: { "Content-Type": "application/json" } }
      );

      const newSubject = regResp.data;
      setSuccessSubjectId(newSubject.id);
      setFormData({ subjectName: "" });
      setSubjects((prev) => [...prev, newSubject]);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this subject?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BACKEND_URL}/${id}`);
      setSubjects(subjects.filter((subject) => subject.id !== id));
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "There are teachers teaching this subject. You cannot remove it."
      );
    }
  };

  const handleAddSubject = async (teacherId: number, subjectId: number) => {
    try {
      await axios.post(`http://localhost:8080/api/teachers/${teacherId}/subjects/${subjectId}`);
      if (selectedTeacherId) {
        const res = await axios.get<Subject[]>(
          `http://localhost:8080/api/teachers/subjects/${selectedTeacherId}`
        );
        setAssignedSubjects(res.data);
      }
    } catch (err) {
      console.error("Failed to add subject to teacher.", err);
    }
  };

  const handleRemoveSubject = async (teacherId: number, subjectId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/teachers/${teacherId}/subjects/${subjectId}`);
      if (selectedTeacherId) {
        const res = await axios.get<Subject[]>(
          `http://localhost:8080/api/teachers/subjects/${selectedTeacherId}`
        );
        setAssignedSubjects(res.data);
      }
    } catch (err) {
      console.error("Failed to remove subject from teacher.", err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-2">Subjects Management</h1>
        <p className="text-[var(--text-light)] max-w-2xl mx-auto">
          Create new subjects and assign them to teachers in your institution
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Subject creation and listing */}
        <div className="bg-[var(--bg-light)] rounded-2xl shadow-lg border border-[var(--border)] p-6">
          <div className="flex items-center mb-6">
            <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text)]">Manage Subjects</h2>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}
          
          {successSubjectId && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
              <p className="text-green-700 font-medium">
                Subject created successfully! ID: {successSubjectId}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div className="mb-4">
              <label className="block text-md font-medium text-[var(--text)] mb-2">
                Create New Subject
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter subject name"
                  value={formData.subjectName}
                  onChange={(e) => setFormData({ subjectName: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                />
                <button
                  type="submit"
                  disabled={loading}
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
                      Saving...
                    </>
                  ) : (
                    "Create Subject"
                  )}
                </button>
              </div>
            </div>
          </form>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[var(--text)]">All Subjects</h3>
              <span className="bg-[var(--primary-light)] text-[var(--primary)] px-3 py-1 rounded-full text-sm">
                {subjects.length} subjects
              </span>
            </div>
            
            {subjects.length === 0 ? (
              <div className="text-center py-8 text-[var(--text-light)] border-2 border-dashed border-[var(--border)] rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[var(--text-light)] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p>No subjects found. Create your first subject.</p>
              </div>
            ) : (
              <div className="bg-[var(--bg)] rounded-xl border border-[var(--border)] overflow-hidden">
                <div className="grid grid-cols-1 gap-0">
                  {subjects.map((subject) => (
                    <div 
                      key={subject.id} 
                      className="flex justify-between items-center p-4 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--bg-light)]"
                    >
                      <div className="flex items-center">
                        <div className="bg-[var(--primary-light)] p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-[var(--text)]">{subject.subjectName}</h4>
                          <p className="text-sm text-[var(--text-light)]">ID: {subject.id}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(subject.id)}
                        className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg flex items-center transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Assign subjects to teachers */}
        <div className="bg-[var(--bg-light)] rounded-2xl shadow-lg border border-[var(--border)] p-6">
          <div className="flex items-center mb-6">
            <div className="bg-[var(--primary-light)] p-3 rounded-xl mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text)]">Assign Subjects to Teachers</h2>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Find Teacher</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-light)] mb-1">Search by name</label>
                <input
                  type="text"
                  placeholder="Teacher name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-light)] mb-1">Search by ID</label>
                <input
                  type="number"
                  placeholder="Teacher ID"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition text-lg bg-[var(--bg)] text-[var(--text)]"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Teachers</h3>
            
            {filteredTeachers.length === 0 ? (
              <div className="text-center py-6 text-[var(--text-light)] border-2 border-dashed border-[var(--border)] rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[var(--text-light)] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <p>No teachers found. Try a different search.</p>
              </div>
            ) : (
              <div className="bg-[var(--bg)] rounded-xl border border-[var(--border)] max-h-60 overflow-y-auto">
                {filteredTeachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    onClick={() => setSelectedTeacherId(teacher.id)}
                    className={`p-4 border-b border-[var(--border)] last:border-b-0 cursor-pointer transition ${
                      selectedTeacherId === teacher.id 
                        ? "bg-[var(--primary-light)] border-l-4 border-[var(--primary)]" 
                        : "hover:bg-[var(--bg-light)]"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                      <div>
                        <h4 className="font-medium text-[var(--text)]">{teacher.displayName}</h4>
                        <p className="text-sm text-[var(--text-light)]">ID: {teacher.id}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedTeacherId && (
            <div className="bg-[var(--bg)] rounded-xl border border-[var(--border)] p-5">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-3" />
                <div>
                  <h3 className="text-xl font-bold text-[var(--text)]">
                    {teachers.find(t => t.id === selectedTeacherId)?.displayName}
                  </h3>
                  <p className="text-[var(--text-light)]">Teacher ID: {selectedTeacherId}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-[var(--text)] mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Current Subjects
                  </h4>
                  
                  {assignedSubjects.length === 0 ? (
                    <div className="text-center py-4 text-[var(--text-light)] bg-[var(--bg-light)] rounded-lg">
                      No subjects assigned
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {assignedSubjects.map((subj) => (
                        <li key={subj.id} className="flex justify-between items-center p-3 bg-[var(--bg-light)] rounded-lg">
                          <span className="text-[var(--text)]">{subj.subjectName}</span>
                          <button
                            onClick={() => handleRemoveSubject(selectedTeacherId, subj.id)}
                            className="text-red-600 hover:text-red-800 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-[var(--text)] mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Available Subjects
                  </h4>
                  
                  {subjects.length === 0 ? (
                    <div className="text-center py-4 text-[var(--text-light)] bg-[var(--bg-light)] rounded-lg">
                      No subjects available
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {subjects.map((subj) => (
                        <li key={subj.id} className="flex justify-between items-center p-3 bg-[var(--bg-light)] rounded-lg">
                          <span className="text-[var(--text)]">{subj.subjectName}</span>
                          <button
                            onClick={() => handleAddSubject(selectedTeacherId, subj.id)}
                            className="text-green-600 hover:text-green-800 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Assign
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Input({
  label,
  name,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  name: string;
  value?: string | number;
  type?: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder="Enter subject name"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
}
import { useEffect, useState } from "react";
import axios from "axios";

interface Subject {
  id: number;
  subjectName: string;
}

interface TeacherSearchForm {
  id: number;
  displayName: string;
  phone: string;
}

export default function SubjectsComponent() {
  const BACKEND_URL = "http://localhost:8080/api";
  const [formData, setFormData] = useState({ subjectName: "" });
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<TeacherSearchForm[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<TeacherSearchForm[]>([]);
  const [successSubjectId, setSuccessSubjectId] = useState<number | null>(null);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState<number | "">("");
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const [teacherSubjects, setTeacherSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    console.log("Component mounted");
    fetchSubjects();
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    console.log("Fetching teachers");
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<TeacherSearchForm[]>(`${BACKEND_URL}/teachers`);
      setTeachers(res.data);
      setFilteredTeachers(res.data);
      console.log("Teachers loaded:", res.data);
    } catch (err: any) {
      console.error("Failed to load teachers:", err);
      setError(err.response?.data?.message || "Failed to load teachers.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    console.log("Fetching subjects");
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BACKEND_URL}/subjects`);
      setSubjects(res.data);
      console.log("Subjects loaded:", res.data);
    } catch (err: any) {
      console.error("Failed to load subjects:", err);
      setError(err.response?.data?.message || "Failed to load subjects.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeacherSubjects = async (teacherId: number) => {
    console.log("Fetching subjects for teacher:", teacherId);
    try {
      const res = await axios.get<Subject[]>(`${BACKEND_URL}/teachers/subjects/${teacherId}`);
      setTeacherSubjects(res.data);
      console.log("Teacher subjects:", res.data);
    } catch (err: any) {
      console.error("Failed to fetch teacher subjects:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      console.log("Creating subject:", formData.subjectName);
      const res = await axios.post(
        `${BACKEND_URL}/subjects?subjectName=${formData.subjectName}`,
        null,
        { headers: { "Content-Type": "application/json" } }
      );
      const newSubject = res.data;
      setSuccessSubjectId(newSubject.id);
      setFormData({ subjectName: "" });
      setSubjects((prev) => [...prev, newSubject]);
      console.log("Subject created:", newSubject);
    } catch (err: any) {
      console.error("Failed to create subject:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubject = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this subject?");
    if (!confirmDelete) return;

    try {
      console.log("Deleting subject with ID:", id);
      await axios.delete(`${BACKEND_URL}/subjects/${id}`);
      setSubjects(subjects.filter((subject) => subject.id !== id));
      console.log("Subject deleted successfully");
    } catch (err: any) {
      console.error("Delete failed:", err);
      setError(err.response?.data?.message || "Failed to delete subject.");
    }
  };

  const handleAddSubjectToTeacher = async (teacherId: number, subjectId: number) => {
    console.log(`Adding subject ${subjectId} to teacher ${teacherId}`);
    try {
      await axios.post(`${BACKEND_URL}/teachers/${teacherId}/subjects/${subjectId}`);
      fetchTeacherSubjects(teacherId);
      console.log("Subject added to teacher successfully");
    } catch (err: any) {
      console.error("Failed to add subject to teacher:", err);
    }
  };

  const handleSearch = () => {
    console.log("Searching teachers by name and ID");
    const filtered = teachers.filter(
      (teacher) =>
        teacher.displayName.toLowerCase().includes(searchName.toLowerCase()) &&
        (searchId === "" || teacher.id === Number(searchId))
    );
    setFilteredTeachers(filtered);
    console.log("Search results:", filtered);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Create Subject</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            value={formData.subjectName}
            onChange={(e) => setFormData({ subjectName: e.target.value })}
            placeholder="Enter Teacher ID"
            className="border px-3 py-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Subject"}
          </button>
        </form>

        {error && <p className="text-red-500">{error}</p>}
        {successSubjectId && (
          <p className="text-green-600">Subject created successfully! ID: {successSubjectId}</p>
        )}

        <h3 className="font-semibold mt-6">All Subjects</h3>
        <ul className="space-y-2">
          {subjects.map((subject) => (
            <li key={subject.id} className="flex justify-between items-center border p-2 rounded">
              <span>{subject.subjectName}</span>
              <button
                onClick={() => handleDeleteSubject(subject.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Assign Subjects to Teacher</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border px-3 py-2 w-full"
          />
          <input
            type="number"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value === "" ? "" : Number(e.target.value))}
            className="border px-3 py-2 w-full"
          />
          <button onClick={handleSearch} className="bg-gray-500 text-white px-3 py-2 rounded">
            Search
          </button>
        </div>

        <ul className="space-y-4">
          {filteredTeachers.map((teacher) => (
            <li key={teacher.id} className="border p-4 rounded">
              <h4 className="font-semibold">{teacher.displayName}</h4>
              <p className="text-sm text-gray-600">Phone: {teacher.phone}</p>
              <button
                className="text-blue-600 underline mt-2"
                onClick={() => {
                  setSelectedTeacherId(teacher.id);
                  fetchTeacherSubjects(teacher.id);
                }}
              >
                View Subjects
              </button>

              {selectedTeacherId === teacher.id && (
                <ul className="mt-2 space-y-1">
                  {subjects.map((subject) => {
                    const isAdded = teacherSubjects.some((s) => s.id === subject.id);
                    return (
                      <li key={subject.id} className="flex justify-between">
                        <span>{subject.subjectName}</span>
                        <button
                          onClick={() => handleAddSubjectToTeacher(teacher.id, subject.id)}
                          disabled={isAdded}
                          className={`px-2 py-1 rounded text-white ${
                            isAdded ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          {isAdded ? "Added" : "Add"}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

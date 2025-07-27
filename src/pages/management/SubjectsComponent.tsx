import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { TeacherSearchForm } from "../search/TeacherSearchComponent";


interface Subject {
  id: number;
  subjectName: string;
}

export default function SubjectsComponent() {
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
    <section>
      <h1 className="text-2xl font-bold mb-4">Subjects Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Left: Subject creation and listing */}
      <div className="border p-4 rounded shadow-sm">
        <h2 className="text-xl font-bold mb-4">Create Subject</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {successSubjectId && (
          <p className="text-green-600 mb-2">
            Subject created successfully! ID: {successSubjectId}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Subject Name"
            value={formData.subjectName}
            onChange={(e) => setFormData({ subjectName: e.target.value })}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Subject"}
          </button>
        </form>

        <h3 className="text-lg font-semibold mt-6 mb-2">All Subjects</h3>
        <ul className="space-y-2">
          {subjects.map((subject) => (
            <li
              key={subject.id}
              className="flex justify-between items-center border px-3 py-2 rounded"
            >
              <span>{subject.subjectName}</span>
              <button
                onClick={() => handleDelete(subject.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Assign subjects to teachers */}
      <div className="border p-4 rounded shadow-sm">
        <h2 className="text-xl font-bold mb-4">Assign Subjects to Teachers</h2>

        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>

        <ul className="space-y-2">
          {filteredTeachers.map((teacher) => (
            <li
              key={teacher.id}
              onClick={() => setSelectedTeacherId(teacher.id)}
              className={`border px-3 py-2 rounded cursor-pointer hover:bg-gray-100 ${
                selectedTeacherId === teacher.id ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              {teacher.displayName} (ID: {teacher.id})
            </li>
          ))}
        </ul>

        {selectedTeacherId && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Subjects Taught</h3>
            <ul className="space-y-1">
              {assignedSubjects.map((subj) => (
                <li key={subj.id} className="flex justify-between items-center">
                  <span>{subj.subjectName}</span>
                  <button
                    onClick={() => handleRemoveSubject(selectedTeacherId, subj.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">Assign New Subject</h3>
            <ul className="space-y-1">
              {subjects.map((subj) => (
                <li key={subj.id} className="flex justify-between items-center">
                  <span>{subj.subjectName}</span>
                  <button
                    onClick={() => handleAddSubject(selectedTeacherId, subj.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
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
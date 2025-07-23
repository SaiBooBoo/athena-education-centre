import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

// Type definition for a subject
type Subject = {
  id: number;
  subjectName: string;
};

export default function SubjectsComponent() {
  const [formData, setFormData] = useState({ subjectName: "" });
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successSubjectId, setSuccessSubjectId] = useState<number | null>(null);

   const BACKEND_URL = "http://localhost:8080/api/subjects";

  // Load subjects on component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(BACKEND_URL);
      setSubjects(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load subjects.");
    } finally {
      setLoading(false);
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

      // Add new subject to list
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
      setSubjects(subjects.filter(subject => subject.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete subject.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
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
            label="Subject Name"
            name="subjectName"
            value={formData.subjectName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, subjectName: e.target.value }))
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Subject"}
          </button>
        </form>
      </div>

      <div className="border p-4 rounded shadow-sm">
        <h2 className="text-xl font-bold mb-4">All Subjects</h2>

        {loading && <p>Loading...</p>}
        {!loading && subjects.length === 0 && <p>No subjects found.</p>}

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
    </div>
  );
}

// Reusable input component
function Input({
  label,
  name,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
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

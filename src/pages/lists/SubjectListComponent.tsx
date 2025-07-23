import { useEffect, useState } from "react";
import axios from "axios";

type Subject = {
  id: number;
  subjectName: string;
};

export default function SubjectListComponent() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Step 1: Load subjects when component mounts
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/subjects");
      setSubjects(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load subjects.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Delete subject by ID
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this subject?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/subjects/${id}`);
      setSubjects(subjects.filter(subject => subject.id !== id)); // remove from UI
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete subject.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Subjects</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {subjects.length === 0 && !loading ? (
        <p>No subjects found.</p>
      ) : (
        <ul className="space-y-3">
          {subjects.map((subject) => (
            <li key={subject.id} className="flex justify-between items-center border p-3 rounded">
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
      )}
    </div>
  );
}

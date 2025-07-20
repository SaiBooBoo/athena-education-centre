import { useState, ChangeEvent } from "react";
import axios from "axios";

// Define acceptable values for gender
type Gender = "MALE" | "FEMALE" | "OTHER";

export default function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    displayName: "",
    gender: "MALE" as Gender,
    dob: "",
    address: "",
    grade: "",
    accountType: "student",
    parents: [] as number[],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successStudentId, setSuccessStudentId] = useState<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1) Register student with JSON payload
      const studentPayload = {
        ...formData,
        grade: parseFloat(formData.grade),
        parents: formData.parents,
      };

      const regResp = await axios.post(
        "http://localhost:8080/api/auth/register",
        studentPayload,
        { headers: { "Content-Type": "application/json" } }
      );

      const studentId = regResp.data.id;
      console.log("Student registered:", regResp.data);
      setSuccessStudentId(studentId);

      // Reset form
      setFormData({
        username: "",
        password: "",
        displayName: "",
        gender: "MALE",
        dob: "",
        address: "",
        grade: "",
        accountType: "student",
        parents: []
      });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Student Registration</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successStudentId && <p className="text-green-600 mb-4">Student registered successfully! ID: {successStudentId}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Display Name */}
        <div>
          <label className="block text-sm font-medium">Display Name</label>
          <input
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-medium">Grade</label>
          <input
            name="grade"
            type="number"
            step="0.01"
            value={formData.grade}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>


        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Registering…" : "Register"}
        </button>
      </form>
    </div>
  );
}

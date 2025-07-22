import { ChangeEvent, useState } from "react"
import { Gender } from "../../modal/dtos/parent.dto"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TeacherRegistration() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    displayName: "",
    nrcNumber: "",
    qualification: "",
    dob: "",
    phone: "",
    address: "",
    earning: 0,
    subject: "",
    profileImagePath: "",
    gender: "MALE" as Gender,
    students: [] as number[],
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successTeacherId, setSuccessTeacherId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'earning' ? Number(value) : value
    }))
  }

  const handleStudentsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const ids = e.target.value
      .split(',')
      .map(id => parseInt(id.trim()))
      .filter(id => !isNaN(id));
    setFormData(prev => ({ ...prev, students: ids }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const teacherPayload = {
        ...formData,
        students: formData.students,
      };
      const regResp = await axios.post(
        "http://localhost:8080/api/auth/register",
        teacherPayload,
        { headers: { "Content-Type": "application/json" } }
      )

      const teacherId = regResp.data.id;
      setSuccessTeacherId(teacherId);
      setFormData({
        username: "",
        password: "",
        displayName: "",
        nrcNumber: "",
        qualification: "",
        dob: "",
        phone: "",
        address: "",
        earning: 0,
        subject: "",
        profileImagePath: "",
        gender: "MALE" as Gender,
        students: [],
      });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Teacher Registration</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {successTeacherId && (
        <p className="text-green-600 mb-4">
          Teacher registered successfully! ID: {successTeacherId}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Display Name</label>
          <input
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">NRC Number</label>
          <input
            name="nrcNumber"
            value={formData.nrcNumber}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Qualification</label>
          <input
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Earning</label>
          <input
            type="number"
            name="earning"
            value={formData.earning}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min={0}
          />
        </div>

        <div>
          <label className="block font-medium">Subject</label>
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Profile Image Path</label>
          <input
            name="profileImagePath"
            value={formData.profileImagePath}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Student IDs (comma-separated)</label>
          <input
            type="text"
            value={formData.students.join(", ")}
            onChange={handleStudentsChange}
            placeholder="e.g. 1, 2, 3"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  )
}


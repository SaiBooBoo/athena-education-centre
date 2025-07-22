import { ChangeEvent, useState } from "react"
import { Gender } from "../../modal/dtos/parent.dto"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { div } from "framer-motion/client";


export default function TeacherRegistration() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    displayName: "",
    nrcNumber: "",
    qualification: "",
    dob: "",
    phoneNumber: "",
    address: "",
    gender: "MALE" as Gender,
    accountType: "teacher",
    subject: [] as string[]
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successTeacherId, setSuccessTeacherId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try{
      const teacherPayload = {
        ...formData,
        subject: formData.subject,
      };

      const regResp = await axios.post(
        "http://localhost:8080/api/auth/register",
        teacherPayload,
        { headers: { "Content-Type": "application/json" } }
      );

      const teacherId = regResp.data.id;
      console.log("Teacher registered:", regResp.data);
      setSuccessTeacherId(teacherId);

      // Reset form
      setFormData({
        username: "",
        password: "",
        displayName: "",
        nrcNumber: "",
        qualification: "",
        dob: "",
        phoneNumber: "",
        address: "",
        gender: "MALE",
        accountType: "teacher",
        subject: [],
      });

      setLoading(false);
      navigate("/teacherDashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }

  }

  return (
    <div>
      <h1>Teacher Registration</h1>
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

      </form>
       

    </div>
  )
}

function Labeling({name, value}: {name: string, value: string | number}){
  return (
    <div>
      <label className="block text-sm font-medium">{name}</label>
      <input
        name={name}
        value={value}
        required
        className="w-full border rounded px-3 py-2"
      />
    </div>
  )
}

import { ChangeEvent, useState } from "react";
import { Gender, ParentType } from "../../modal/dtos/parent.dto";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ParentRegistration() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    displayName: "",
    gender: "MALE" as Gender,
    nrcNumber: "",
    dob: "",
    job: "",
    phoneNumber: "",
    address: "",
    accountType: "parent",
    students: [] as number[],
    parentType: "" as ParentType, // Added to match expected backend field
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successParentId, setSuccessParentId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const parentPayload = { ...formData,
        students: formData.students,
       };

      const regResp = await axios.post(
        "http://localhost:8080/api/auth/register",
        parentPayload,
        { headers: {"Content-Type": "application/json"}}
      );

      const parentId = regResp.data.id;
      console.log("Parent registered:", regResp.data);
      setSuccessParentId(parentId);

      // Reset form
      setFormData({
        username: "",
        password: "",
        displayName: "",
        gender: "MALE",
        nrcNumber: "",
        dob: "",
        job: "",
        phoneNumber: "",
        address: "",
        accountType: "parent",
        students: [],
        parentType: "GUARDIAN", // Reset this too
      });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2>Parent Registration</h2>
      {error && <p className="text-red-500">{error}</p>}
      {successParentId && (
        <p className="text-green-500">
          Parent registered successfully with ID: {successParentId}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Username" name="username" value={formData.username} onChange={handleChange} />
        <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
        <Input label="Display Name" name="displayName" value={formData.displayName} onChange={handleChange} />
        
        {/* Gender */}
        <Select
          label="Gender"
          name="gender"
          value={formData.gender}
          options={["MALE", "FEMALE", "OTHER"]}
          onChange={handleChange}
        />

        {/* Parent Type */}
        <Select
          label="Parent Type"
          name="parentType"
          value={formData.parentType}
          options={["FATHER", "MOTHER", "GUARDIAN", "OTHER"]}
          onChange={handleChange}
        />

        <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
        <Input label="NRC Number" name="nrcNumber" value={formData.nrcNumber} onChange={handleChange} />
        <Input label="Career" name="job" value={formData.job} onChange={handleChange} />
        <Input label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        <Input label="Address" name="address" value={formData.address} onChange={handleChange} />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

// Simple reusable input
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
      <label className="block text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
}

// Simple reusable select
function Select({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

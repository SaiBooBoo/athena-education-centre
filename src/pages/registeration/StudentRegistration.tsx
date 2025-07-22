import { useState, ChangeEvent } from "react";
import axios from "axios";
import { FaCalendarAlt, FaCalendarDay, FaCheckCircle, FaChevronDown, FaExclamationCircle, FaHome, FaIdCard, FaKey, FaLock, FaMapMarkerAlt, FaSignature, FaStar, FaUser, FaUserCircle, FaUserFriends, FaUserGraduate, FaUserPlus, FaVenusMars } from "react-icons/fa";
import { FaGraduationCap, FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
<div className="max-w-4xl mx-auto p-8 bg-[var(--bg-light)] rounded-2xl shadow-xl border border-highlight/30">
  <div className="text-center mb-8">
    <div className="inline-flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-2xl mb-4">
      <FaUserGraduate className="text-4xl text-primary" />
    </div>
    <h2 className="text-3xl font-bold text-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      Student Registration
    </h2>
    <p className="text-text-muted mt-2">Create a new student account</p>
  </div>

  {/* Status Messages */}
  {error && (
    <div className="mb-6 bg-danger/20 border-2 border-danger/30 text-danger px-4 py-3 rounded-xl flex items-center">
      <FaExclamationCircle className="mr-3 flex-shrink-0" />
      <span>{error}</span>
    </div>
  )}
  
  {successStudentId && (
    <div className="mb-6 bg-success/20 border-2 border-success/30 text-success px-4 py-3 rounded-xl flex items-center">
      <FaCheckCircle className="mr-3 flex-shrink-0" />
      <span>Student registered successfully! ID: <span className="font-bold">{successStudentId}</span></span>
    </div>
  )}

  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Two Column Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Username */}
        <div>
          <label className="block text-shadow-sm font-medium text-primary mb-2  items-center">
            <FaUser className="mr-2 text-text-muted " /> Username
          </label>
          <div className="relative">
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full bg-bg border-2 border-highlight/30 rounded-xl px-4 py-3 pl-10 text-text focus:ring-2 focus:ring-primary focus:border-highlight shadow-inner"
              placeholder="Enter username"
            />
            <FaUserCircle className="absolute left-3 top-3.5 text-text-muted" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-shadow-sm font-medium text-primary mb-2  items-center">
            <FaLock className="mr-2 text-text-muted" /> Password
          </label>
          <div className="relative">
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-bg border-2 border-highlight/30 rounded-xl px-4 py-3 pl-10 text-text focus:ring-2 focus:ring-primary focus:border-highlight shadow-inner"
              placeholder="Create password"
            />
            <FaKey className="absolute left-3 top-3.5 text-text-muted" />
          </div>
        </div>

        {/* Display Name */}
        <div>
          <label className="block text-shadow-sm font-medium text-primary mb-2  items-center">
            <FaIdCard className="mr-2 text-text-muted" /> Display Name
          </label>
          <div className="relative">
            <input
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
              className="w-full bg-bg border-2 border-highlight/30 rounded-xl px-4 py-3 pl-10 text-text focus:ring-2 focus:ring-primary focus:border-highlight shadow-inner"
              placeholder="Full name"
            />
            <FaSignature className="absolute left-3 top-3.5 text-text-muted" />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Gender */}
        <div>
          <label className="block text-shadow-sm font-medium text-primary mb-2  items-center">
            <FaVenusMars className="mr-2 text-text-muted" /> Gender
          </label>
          <div className="relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-bg border-2 border-highlight/30 rounded-xl px-4 py-3 pl-10 text-text focus:ring-2 focus:ring-primary focus:border-highlight shadow-inner appearance-none"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            <FaUserFriends className="absolute left-3 top-3.5 text-text-muted" />
            <FaChevronDown className="absolute right-3 top-3.5 text-text-muted text-sm" />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-shadow-sm font-medium text-primary mb-2  items-center">
            <FaCalendarAlt className="mr-2 text-amber-800" /> Date of Birth
          </label>
          <div className="relative">
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full bg-bg border-2 border-highlight/30 rounded-xl px-4 py-3 pl-10 text-text focus:ring-2 focus:ring-primary focus:border-highlight shadow-inner"
            />
            <FaCalendarDay className="absolute left-3 top-3.5 text-amber-800" />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-shadow-sm font-medium text-primary mb-2  items-center">
            <FaMapMarkerAlt className="mr-2 text-text-muted" /> Address
          </label>
          <div className="relative">
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full bg-bg border-2 border-highlight/30 rounded-xl px-4 py-3 pl-10 text-text focus:ring-2 focus:ring-primary focus:border-highlight shadow-inner"
              placeholder="Full address"
            />
            <FaHome className="absolute left-3 top-3.5 text-text-muted" />
          </div>
        </div>

        {/* Grade */}
        <div>
          <label className="block text-shadow-sm font-medium text-primary mb-2  items-center">
            <FaGraduationCap className="mr-2 text-text-muted" /> Grade
          </label>
          <div className="relative">
            <input
              name="grade"
              type="number"
              step="0.01"
              value={formData.grade}
              onChange={handleChange}
              required
              className="w-full  bg-bg border-2 border-highlight/30 rounded-xl px-4 py-3 pl-10 text-text focus:ring-2 focus:ring-primary focus:border-highlight shadow-inner"
              placeholder="Enter grade"
            />
            <FaStar className="absolute left-3 top-3.5 text-text-muted" />
          </div>
        </div>
      </div>
    </div>

    {/* Submit Button - Larger */}
    <div className="mt-10">
      <button
        type="submit"
        disabled={loading}
        // Change this to edit page after completing the registration to add photo and parent
        className={`w-full py-5 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
          loading 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-gradient-to-r from-primary to-secondary text-bg-dark hover:from-primary/90 hover:to-secondary/90"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <FaSpinner className="animate-spin mr-3 text-xl" />
            Registering Student...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <FaUserPlus className="mr-3 text-xl" />
            Register Student
          </span>
        )}
      </button>
    </div>
  </form>
</div>
  );
}

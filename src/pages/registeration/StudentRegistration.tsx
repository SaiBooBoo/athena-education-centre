import { useState, ChangeEvent } from "react";
import {
FaGraduationCap, FaUserGraduate,
  FaUserCircle, FaKey, FaSignature, FaVenusMars,
FaChevronDown, FaCalendarDay,
  FaHome,  FaUserPlus, FaSpinner,
  FaExclamationCircle, FaCheckCircle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Gender } from "../../modal/dtos/parent.dto";
import axios from "axios";

export default function StudentRegistration() {
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

      setTimeout(() => {
        navigate("/studentDashboard");
      }, 2000);

    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[var(--bg-dark)] to-[var(--bg)]">
      <div className="w-full max-w-5xl bg-[var(--bg-light)] rounded-3xl shadow-2xl overflow-hidden border border-highlight/30">
        {/* Header */}
        <div className="p-8 bg-gradient-to-r from-[var(--primary)] to-[var(--highlight)]">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 p-4 rounded-2xl mb-4">
              <FaUserGraduate className="text-4xl text-[var(--primary)]" />
            </div>
            <h2 className="text-4xl font-bold text-[var(--text)]">
              Student Registration
            </h2>
            <p className="text-[var(--text-muted)] mt-2 text-lg">
              Create a new student account
            </p>
          </div>
        </div>

        {/* Status Messages */}
        <div className="px-8 pt-6">
          {error && (
            <div className="mb-6 bg-[var(--danger)]/20 border-2 border-[var(--danger)]/30 text-[var(--danger)] px-4 py-3 rounded-xl flex items-center">
              <FaExclamationCircle className="mr-3 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {successStudentId && (
            <div className="mb-6 bg-[var(--success)]/20 border-2 border-[var(--success)]/30 text-[var(--success)] px-4 py-3 rounded-xl flex items-center">
              <FaCheckCircle className="mr-3 flex-shrink-0" />
              <span>Student registered successfully! ID: <span className="font-bold">{successStudentId}</span></span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Username */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--bg-dark)] p-3 rounded-xl">
                    <FaUserCircle className="text-2xl text-[var(--primary)]" />
                  </div>
                  <label className="text-xl font-medium text-[var(--text)]">
                    Username
                  </label>
                </div>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full text-lg bg-[var(--bg)] text-[var(--text)] border-2 border-highlight/30 rounded-xl px-5 py-3 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 transition-colors"
                  placeholder="Enter username"
                />
              </div>

              {/* Password */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--bg-dark)] p-3 rounded-xl">
                    <FaKey className="text-2xl text-[var(--primary)]" />
                  </div>
                  <label className="text-xl font-medium text-[var(--text)]">
                    Password
                  </label>
                </div>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full text-lg bg-[var(--bg)] text-[var(--text)] border-2 border-highlight/30 rounded-xl px-5 py-3 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 transition-colors"
                  placeholder="Create password"
                />
              </div>

              {/* Display Name */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--bg-dark)] p-3 rounded-xl">
                    <FaSignature className="text-2xl text-[var(--primary)]" />
                  </div>
                  <label className="text-xl font-medium text-[var(--text)]">
                    Display Name
                  </label>
                </div>
                <input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  required
                  className="w-full text-lg bg-[var(--bg)] text-[var(--text)] border-2 border-highlight/30 rounded-xl px-5 py-3 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 transition-colors"
                  placeholder="Full name"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Gender */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--bg-dark)] p-3 rounded-xl">
                    <FaVenusMars className="text-2xl text-[var(--primary)]" />
                  </div>
                  <label className="text-xl font-medium text-[var(--text)]">
                    Gender
                  </label>
                </div>
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full text-lg bg-[var(--bg)] text-[var(--text)] border-2 border-highlight/30 rounded-xl px-5 py-3 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 transition-colors appearance-none"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <FaChevronDown className="absolute right-4 top-4 text-[var(--text-muted)]" />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--bg-dark)] p-3 rounded-xl">
                    <FaCalendarDay className="text-2xl text-[var(--primary)]" />
                  </div>
                  <label className="text-xl font-medium text-[var(--text)]">
                    Date of Birth
                  </label>
                </div>
                <input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full text-lg bg-[var(--bg)] text-[var(--text)] border-2 border-highlight/30 rounded-xl px-5 py-3 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 transition-colors"
                />
              </div>

              {/* Address */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--bg-dark)] p-3 rounded-xl">
                    <FaHome className="text-2xl text-[var(--primary)]" />
                  </div>
                  <label className="text-xl font-medium text-[var(--text)]">
                    Address
                  </label>
                </div>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full text-lg bg-[var(--bg)] text-[var(--text)] border-2 border-highlight/30 rounded-xl px-5 py-3 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 transition-colors"
                  placeholder="Full address"
                />
              </div>

              {/* Grade */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--bg-dark)] p-3 rounded-xl">
                    <FaGraduationCap className="text-2xl text-[var(--primary)]" />
                  </div>
                  <label className="text-xl font-medium text-[var(--text)]">
                    Grade
                  </label>
                </div>
                <input
                  name="grade"
                  type="number"
                  step="0.01"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                  className="w-full text-lg bg-[var(--bg)] text-[var(--text)] border-2 border-highlight/30 rounded-xl px-5 py-3 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 transition-colors"
                  placeholder="Enter grade"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-12">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-xl font-bold text-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-[var(--bg-dark)] hover:from-[var(--primary)]/90 hover:to-[var(--secondary)]/90"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-3 text-2xl" />
                  Registering Student...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FaUserPlus className="mr-3 text-2xl" />
                  Register Student
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

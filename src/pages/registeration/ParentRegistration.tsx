import { ChangeEvent, useState } from "react";
import { Gender, ParentType } from "../../modal/dtos/parent.dto";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  FaUser, FaLock, FaIdCard, FaBriefcase, 
  FaPhone, FaHome, FaVenusMars, FaUserTag,
  FaCalendarAlt, FaUserPlus, FaSpinner,
  FaExclamationCircle, FaCheckCircle
} from "react-icons/fa";

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
    parentType: "GUARDIAN" as ParentType,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successParentId, setSuccessParentId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const parentPayload = { ...formData, students: formData.students };
      const regResp = await axios.post(
        "http://localhost:8080/api/auth/register",
        parentPayload,
        { headers: {"Content-Type": "application/json"} }
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
        parentType: "GUARDIAN",
      });
      
      // Navigate after a short delay
      setTimeout(() => {
        navigate("/parentDashboard");
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
              <FaUserPlus className="text-4xl text-[var(--primary)]" />
            </div>
            <h2 className="text-4xl font-bold text-[var(--text)]">
              Parent Registration
            </h2>
            <p className="text-[var(--text-muted)] mt-2 text-lg">
              Register as a new parent
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

          {successParentId && (
            <div className="mb-6 bg-[var(--success)]/20 border-2 border-[var(--success)]/30 text-[var(--success)] px-4 py-3 rounded-xl flex items-center">
              <FaCheckCircle className="mr-3 flex-shrink-0" />
              <span>Parent registered successfully! ID: <span className="font-bold">{successParentId}</span></span>
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
                    <FaUser className="text-2xl text-[var(--primary)]" />
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
                  placeholder="Create your username"
                />
              </div>

              {/* Password */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--bg-dark)] p-3 rounded-xl">
                    <FaLock className="text-2xl text-[var(--primary)]" />
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
                  placeholder="Create a secure password"
                />
              </div>

              {/* Display Name */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--bg-dark)] p-3 rounded-xl">
                    <FaIdCard className="text-2xl text-[var(--primary)]" />
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
                  placeholder="Your full name"
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
                </div>
              </div>

              {/* Parent Type */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--bg-dark)] p-3 rounded-xl">
                    <FaUserTag className="text-2xl text-[var(--primary)]" />
                  </div>
                  <label className="text-xl font-medium text-[var(--text)]">
                    Parent Type
                  </label>
                </div>
                <div className="relative">
                  <select
                    name="parentType"
                    value={formData.parentType}
                    onChange={handleChange}
                    className="w-full text-lg bg-[var(--bg)] text-[var(--text)] border-2 border-highlight/30 rounded-xl px-5 py-3 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 transition-colors appearance-none"
                  >
                    <option value="FATHER">Father</option>
                    <option value="MOTHER">Mother</option>
                    <option value="GUARDIAN">Guardian</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--bg-dark)] p-3 rounded-xl">
                    <FaCalendarAlt className="text-2xl text-[var(--primary)]" />
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
            </div>
          </div>

          {/* Bottom Row - Full Width Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            {/* NRC Number */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--bg-dark)] p-3 rounded-xl">
                  <FaIdCard className="text-2xl text-[var(--primary)]" />
                </div>
                <label className="text-xl font-medium text-[var(--text)]">
                  NRC Number
                </label>
              </div>
              <input
                name="nrcNumber"
                value={formData.nrcNumber}
                onChange={handleChange}
                required
                className="w-full text-lg bg-[var(--bg)] text-[var(--text)] border-2 border-highlight/30 rounded-xl px-5 py-3 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 transition-colors"
                placeholder="Your identification number"
              />
            </div>

            {/* Career */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--bg-dark)] p-3 rounded-xl">
                  <FaBriefcase className="text-2xl text-[var(--primary)]" />
                </div>
                <label className="text-xl font-medium text-[var(--text)]">
                  Career
                </label>
              </div>
              <input
                name="job"
                value={formData.job}
                onChange={handleChange}
                required
                className="w-full text-lg bg-[var(--bg)] text-[var(--text)] border-2 border-highlight/30 rounded-xl px-5 py-3 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 transition-colors"
                placeholder="Your profession"
              />
            </div>
          </div>

          {/* Contact Row - Full Width Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            {/* Phone Number */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--bg-dark)] p-3 rounded-xl">
                  <FaPhone className="text-2xl text-[var(--primary)]" />
                </div>
                <label className="text-xl font-medium text-[var(--text)]">
                  Phone Number
                </label>
              </div>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full text-lg bg-[var(--bg)] text-[var(--text)] border-2 border-highlight/30 rounded-xl px-5 py-3 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 transition-colors"
                placeholder="Your contact number"
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
                placeholder="Your full address"
              />
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
                  Registering Parent...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FaUserPlus className="mr-3 text-2xl" />
                  Register Parent
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
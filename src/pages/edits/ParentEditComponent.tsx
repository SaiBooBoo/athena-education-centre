import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Gender } from "../../modal/dtos/parent.dto";
import { StudentSummaryDto } from "../../modal/dtos/dtos";
import axios from "axios";
import { FaCamera, FaSearch, FaUser, FaMale, FaFemale, FaCalendarAlt, FaBook, FaCheck, FaPlus } from "react-icons/fa";
import { Dialog } from '@headlessui/react';

export default function ParentEditComponent() {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: 0,
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
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasProfileImage, setHasProfileImage] = useState(false);
  const [allStudents, setAllStudents] = useState<StudentSummaryDto[]>([]); 
  const [studentSearch, setStudentSearch] = useState("");
  const [studentError, setStudentError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<StudentSummaryDto[]>([]);

  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:8080/api/parents/${id}`)
    .then((res) => {
      setFormData(res.data);
      setLoading(false);

      const image = new Image();
      image.src = `http://localhost:8080/api/parents/${id}/image`;
      image.onload = () => setHasProfileImage(true);
      image.onerror = () => setHasProfileImage(false);
    })
    .catch((err) => {
      setError("Could not load parent");
      setLoading(false);
    });

    axios.get("http://localhost:8080/api/students")
    .then((res) => {
      setAllStudents(res.data);
    })
    .catch((err) => {
      console.error("Error fetching students:", err);
    });
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
      const file = e.target.files[0];
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if(imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleAddStudent = (student: StudentSummaryDto) => {
    if (!formData.students.includes(student.id)) {
      setFormData(prev => ({
        ...prev,
        students: [...prev.students, student.id]
      }));
      setSelectedStudents(prev => [...prev, student]);
    }
  };

  const handleRemoveStudent = (studentId: number) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.filter(id => id !== studentId)
    }));
    setSelectedStudents(prev => prev.filter(s => s.id !== studentId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updateResp = await axios.put(`http://localhost:8080/api/parents/${id}`, formData);
      console.log("Parent Update successfully: ", updateResp.data);

      if(profileImage) {
        const imageData = new FormData();
        imageData.append("file", profileImage);

        const imageResp = await axios.put(`http://localhost:8080/api/parents/${id}/image`, imageData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log("Image updated successfully: ", imageResp.data);
      }
      
      setIsSuccessDialogOpen(true);
      setTimeout(() => {
        setIsSuccessDialogOpen(false);
        navigate("/parentDashboard");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const filteredStudents = allStudents.filter(student => {
    const query = studentSearch.toLowerCase();
    return (
      student.displayName.toLowerCase().includes(query) ||
      student.id.toString().includes(query) ||
      student.username.toLowerCase().includes(query)
    );
  });

  if(loading) return <div className="flex justify-center items-center h-screen">Loading parent data...</div>;
  if(error) return <p className="text-red-500 text-center py-8">{error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Parent Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Picture */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="relative mb-6">
              {imagePreview ? (
                <img 
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-full h-64 object-cover rounded-xl shadow-lg border-4 border-gray-100 ring-4 ring-blue-500/20"
                />
              ) : hasProfileImage ? (
                <img 
                  src={`http://localhost:8080/api/parents/${id}/image`}
                  alt="Profile"
                  className="w-full h-64 object-cover rounded-xl shadow-lg border-4 border-gray-100 ring-4 ring-blue-500/20"
                />
              ) : (
                <div className="bg-gray-100 border-2 border-dashed border-blue-500 rounded-xl w-full h-64 flex items-center justify-center">
                  <FaUser className="text-6xl text-gray-400" />
                </div>
              )}
              
              <label 
                htmlFor="profileImage"
                className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-full shadow-xl cursor-pointer hover:bg-blue-700 transition-all transform hover:scale-105 ring-2 ring-white"
              >
                <FaCamera className="text-xl" />
                <input 
                  type="file" 
                  id="profileImage" 
                  className="hidden" 
                  onChange={handleFileChange} 
                  accept="image/*"
                />
              </label>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">{formData.displayName}</h2>
              <p className="text-gray-600">ID: {formData.id}</p>
              <p className="text-gray-600 capitalize">{formData.gender.toLowerCase()}</p>
            </div>
          </div>
        </div>

        {/* Middle Column - Parent Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Parent Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Display Name</label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">NRC Number</label>
                  <input
                    type="text"
                    name="nrcNumber"
                    value={formData.nrcNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Job</label>
                  <input
                    type="text"
                    name="job"
                    value={formData.job}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Manage Children */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Children</h2>
            
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search students by ID or name..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">
                Selected Children: {selectedStudents.length}
              </p>
              {selectedStudents.length > 0 && (
                <div className="mt-2 space-y-2">
                  {selectedStudents.map(student => (
                    <div key={student.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                      <span>{student.displayName} (ID: {student.id})</span>
                      <button
                        onClick={() => handleRemoveStudent(student.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredStudents.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No students found</p>
              ) : (
                filteredStudents.map(student => (
                  <div key={student.id} className="border rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{student.displayName}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span className="mr-2">ID: {student.id}</span>
                          <span className="mr-2 flex items-center">
                            {student.gender === 'MALE' ? <FaMale className="mr-1" /> : <FaFemale className="mr-1" />}
                            {student.gender}
                          </span>
                          <span className="mr-2 flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            {student.dob}
                          </span>
                          <span className="flex items-center">
                            <FaBook className="mr-1" />
                            Grade {student.grade}
                          </span>
                        </div>
                      </div>
                      {formData.students.includes(student.id) ? (
                        <button
                          className="text-green-500 flex items-center"
                          disabled
                        >
                          <FaCheck className="mr-1" /> Added
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddStudent(student)}
                          className="text-blue-500 hover:text-blue-700 flex items-center"
                        >
                          <FaPlus className="mr-1" /> Add
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog
        open={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg max-w-sm mx-auto p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Success!
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-500">
              Parent information has been updated successfully.
            </Dialog.Description>

            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setIsSuccessDialogOpen(false)}
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
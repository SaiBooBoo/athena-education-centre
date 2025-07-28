import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Gender, ParentType } from "../../modal/dtos/parent.dto";
import { StudentSummaryDto } from "../../modal/dtos/dtos";
import axios from "axios";
import { FaCamera, FaSearch, FaUser, FaMale, FaFemale, FaBook, FaCheck, FaPlus, FaMinus, FaEdit } from "react-icons/fa";

export default function ParentEditComponent() {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: 0,
    displayName: "",
    gender: "MALE" as Gender,
    nrcNumber: "",
    dob: "",
    job: "",
    phoneNumber: "",
    address: "",
    parentType: "FATHER" as ParentType,
    accountType: "parent",
    students: [] as StudentSummaryDto[],
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hasProfileImage, setHasProfileImage] = useState(false);
  const [allStudents, setAllStudents] = useState<StudentSummaryDto[]>([]); 
  const [studentSearch, setStudentSearch] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<StudentSummaryDto[]>([]);
  const [isAddingStudents, setIsAddingStudents] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:8080/api/parents/${id}`)
    .then((res) => {
      setFormData(res.data);
      setSelectedStudents(res.data.students || []);
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
    if (!selectedStudents.some(s => s.id === student.id)) {
      setSelectedStudents(prev => [...prev, student]);
    }
  };

  const handleRemoveStudent = (studentId: number) => {
    setSelectedStudents(prev => prev.filter(s => s.id !== studentId));
  };

  const handleSaveStudents = async () => {
    setIsAddingStudents(true);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/parents/addStudents/${id}`,
        {
          students: selectedStudents.map(student => ({ id: student.id }))
        }
      );
      console.log("Students updated successfully: ", response.data);
      setSuccessMessage("Children updated successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsAddingStudents(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updateResp = await axios.put(`http://localhost:8080/api/parents/${id}`, formData);
      console.log("Parent Update successfully: ", updateResp.data);

      if(profileImage) {
        const imageData = new FormData();
        imageData.append("file", profileImage);

        const imageResp = await axios.put(`http://localhost:8080/api/parents/${id}/upload-image`, imageData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log("Image updated successfully: ", imageResp.data);
      }
      
      setSuccessMessage("Parent information saved successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
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
  if(error) return <p className="text-danger text-center py-8">{error}</p>;

  return (
    <div className="mt-4 bg-[var(--bg-dark)] rounded-xl shadow-md min-h-screen p-6 bg-bg">
      {/* Success Message Banner */}
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-success text-white px-4 py-2 rounded-md shadow-lg z-50">
          {successMessage}
        </div>
      )}
      
      <h1 className="text-2xl font-bold text-text mb-6 flex items-center"><FaEdit className="mr-2"/>Edit Parent Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Picture */}
        <div className=" lg:col-span-1">
          <div className="bg-[var(--bg-light)] rounded-xl shadow-md p-6 border border-border-muted">
            <div className="relative mb-6">
              {imagePreview ? (
                <img 
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-full h-64 object-cover rounded-xl shadow-lg border-4 border-bg-light ring-4 ring-primary/20"
                />
              ) : hasProfileImage ? (
                <img 
                  src={`http://localhost:8080/api/parents/${id}/image`}
                  alt="Profile"
                  className="w-full h-64 object-cover rounded-xl shadow-lg border-4 border-bg-light ring-4 ring-primary/20"
                />
              ) : (
                <div className="bg-bg-dark border-2 border-dashed border-primary rounded-xl w-full h-64 flex items-center justify-center">
                  <FaUser className="text-6xl text-text-muted" />
                </div>
              )}
              
              <label 
                htmlFor="profileImage"
                className="absolute -bottom-2 -right-2 bg-primary text-text p-3 rounded-full shadow-xl cursor-pointer hover:bg-highlight transition-all transform hover:scale-105 ring-2 ring-bg-light"
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
              <h2 className="text-xl font-semibold text-text">{formData.displayName}</h2>
              <p className="text-text-muted">ID: {formData.id}</p>
              <p className="text-text-muted capitalize">{formData.gender.toLowerCase()}</p>
            </div>
          </div>
        </div>

        {/* Middle Column - Parent Form */}
        <div className="lg:col-span-1 ">
          <div className="bg-[var(--bg-light)] rounded-xl shadow-neutral-700 p-6 border border-border-muted">
            <h2 className="text-xl font-semibold text-text mb-4">Parent Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted">Display Name</label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-border shadow-lg focus:border-primary focus:ring-primary bg-bg text-text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary bg-bg text-text"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted">Parent Type</label>
                  <select
                    name="parentType"
                    value={formData.parentType}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary bg-bg text-text"
                  >
                    <option value="FATHER">Father</option>
                    <option value="MOTHER">Mother</option>
                    <option value="GUARDIAN">Guardian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary bg-bg text-text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted">NRC Number</label>
                  <input
                    type="text"
                    name="nrcNumber"
                    value={formData.nrcNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary bg-bg text-text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary bg-bg text-text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted">Job</label>
                  <input
                    type="text"
                    name="job"
                    value={formData.job}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary bg-bg text-text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary bg-bg text-text"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-text py-2 px-4 rounded-md hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Manage Children */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--bg-light)] rounded-xl shadow-md p-6 border border-border-muted">
            <h2 className="text-xl font-semibold text-text mb-4">Manage Children</h2>
            
            {/* Current Children */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-text mb-2">Current Children</h3>
              {selectedStudents.length === 0 ? (
                <p className="text-text-muted text-sm">No children assigned yet</p>
              ) : (
                <div className="space-y-2">
                  {selectedStudents.map(student => (
                    <div key={student.id} className="flex items-center justify-between bg-bg-dark p-3 rounded border border-border-muted">
                      <div>
                        <p className="font-medium text-text">{student.displayName}</p>
                        <p className="text-xs text-text-muted">ID: {student.id}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveStudent(student.id)}
                        className="text-danger hover:text-danger-dark p-1 rounded-full hover:bg-bg"
                      >
                        <FaMinus />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Children Section */}
            <div className="mb-4">
              <h3 className="text-lg font-medium text-text mb-2">Add Children</h3>
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-text-muted" />
                </div>
                <input
                  type="text"
                  placeholder="Search students by ID or name..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="pl-10 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary bg-bg text-text"
                />
              </div>

              <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
                {filteredStudents.length === 0 ? (
                  <p className="text-text-muted text-center py-4">No students found</p>
                ) : (
                  filteredStudents.map(student => (
                    <div key={student.id} className="border border-border rounded-lg p-3 hover:bg-bg-dark">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-text">{student.displayName}</h3>
                          <div className="flex items-center text-sm text-text-muted mt-1">
                            <span className="mr-2">ID: {student.id}</span>
                            <span className="mr-2 flex items-center">
                              {student.gender === 'MALE' ? <FaMale className="mr-1" /> : <FaFemale className="mr-1" />}
                              {student.gender}
                            </span>
                            <span className="flex items-center">
                              <FaBook className="mr-1" />
                              Grade {student.grade}
                            </span>
                          </div>
                        </div>
                        {selectedStudents.some(s => s.id === student.id) ? (
                          <button
                            className="text-success flex items-center"
                            disabled
                          >
                            <FaCheck className="mr-1" /> Added
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddStudent(student)}
                            className="text-primary hover:text-highlight flex items-center"
                          >
                            <FaPlus className="mr-1" /> Add
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={handleSaveStudents}
                disabled={isAddingStudents}
                className="w-full bg-secondary text-text py-2 px-4 rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                {isAddingStudents ? "Saving..." : "Save Children Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
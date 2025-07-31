import { ChangeEvent, useEffect, useState } from "react";
import { SubjectDto } from "../../modal/dtos/dtos";
import { useNavigate, useParams } from "react-router-dom";
import { Gender } from "../../modal/dtos/parent.dto";
import axios from "axios";
import { FaCamera, FaEdit, FaMinus, FaPlus, FaSave, FaUser } from "react-icons/fa";
import { Subject } from "../management/SubjectsComponent";

export default function TeacherEditComponent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: 0,
    displayName: "",
    nrcNumber: "",
    qualification: "",
    dob: "",
    phoneNumber: "",
    address: "",
    profileImagePath: "",
    gender: "MALE" as Gender,
    subjects: [] as Subject[],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [hasProfileImage, setHasProfileImage] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isAddingSubjects, setIsAddingSubjects] = useState(false);
  const [subject, setSubject] = useState<Subject[]>();
  const [assignedSubjects, setAssignedSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:8080/api/teachers/${id}`)
      .then((res) => {
        setFormData(res.data);
        setSelectedSubjects(res.data.subjects || []);
        setLoading(false);

        const image = new Image();
        image.src = `http://localhost:8080/api/teachers/${id}/image`;
        image.onload = () => setHasProfileImage(true);
        image.onerror = () => setHasProfileImage(false);
      })
      .catch((err) => {
        setError("Could not load teacher");
        setLoading(false);
        console.error(`Error fetching teacher with Id: ${id}`, err);
      });

    axios
      .get(`http://localhost:8080/api/subjects`)
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((err) => {
        console.error("Error fetching subjects: ", err);
      });

      axios
      .get(`http://localhost:8080/api/teachers/subjects/${id}`)
      .then((res) => {
        setSelectedSubjects(res.data);
        setFormData((prev) => ({ ...prev, subjects: res.data}))
      })
      .catch((err) => {
        console.error("Error fetching subjects: ", err);
      })
  }, [id]);

  useEffect(() => {
    const fetchAssignedSubjects = async () => {
      if( id ) {
        const res = await axios.get<Subject[]>(
          `http://localhost:8080/api/teachers/subjects/${id}`
        );
        setAssignedSubjects(res.data);
      }
    };
    fetchAssignedSubjects();
  }, [selectedSubjects, id])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);


  const handleAddSubject = async (subject: SubjectDto) => {
    if (!selectedSubjects.some((s) => s.id == subject.id)) {
    await axios.post(`http://localhost:8080/api/teachers/${id}/subjects/${subject.id}`);
    const updatedSubjects = [...selectedSubjects, subject];
    setSelectedSubjects(updatedSubjects);
    setFormData((prev) => ({ ...prev, subjects: updatedSubjects }));
    }
  };

const handleRemoveSubject = async (teacherId: number, subjectId: number) => {
     try {
    await axios.delete(`http://localhost:8080/api/teachers/${teacherId}/subjects/${subjectId}`);
    const updatedSubjects = selectedSubjects.filter((s) => s.id !== subjectId);
    setSelectedSubjects(updatedSubjects);
    setFormData((prev) => ({ ...prev, subjects: updatedSubjects }));
    setAssignedSubjects(updatedSubjects); // optional sync
  } catch (err) {
    console.error("Failed to remove subject from teacher.", err);
  }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updateResp = await axios.put(
        `http://localhost:8080/api/teachers/${id}`,
        formData
      );
      console.log("Teacher updated successfully: ", updateResp.data);

      if (profileImage) {
        const imageData = new FormData();
        imageData.append("file", profileImage);

        const imageResp = await axios.put(
          `http://localhost:8080/api/teachers/${id}/upload-image`,
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Image updated successfully: ", imageResp.data);
      }

      setSuccessMessage("Teacher information saved successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/teacherDashboard");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading teacher data...
      </div>
    );
  if (error) return <p className="text-danger text-center py-8">{error}</p>;

  return (
    <div className="mt-4 bg-[var(--bg-dark)] rounded-xl shadow-md min-h-screen p-6 bg-bg">
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-success text-white px-4 py-2 rounded-md shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <h1 className="text-2xl font-bold text-text mb-6 flex items-center bg-gradient-to-r">
        <FaEdit className="mr-2" />
        Edit Teacher Profile
      </h1>
      <div className="grid lg:grid-cols-3 gird-cols-3 gap-4">
        {/* Left Column - Profile Picture */}
        <div className="bg-[var(--bg-light)] rounded-xl shadow-md p-4 mt-2">
          <div className="relative mb-6">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : hasProfileImage ? (
              <img
                src={`http://localhost:8080/api/teachers/${id}/image`}
                alt="Profile Image"
                className="w-full h-64 object-cover rounded-xl shadow-lg border-4 border-bg-light ring-4 ring-primary/20"
              />
            ) : (
              <div className="bg-bg-dark border-2 border-dashed border-primary rounded-xl w-full h-64 flex items-center justify-center">
                <FaUser className="text-6xl text-text-muted" />
              </div>
            )}

            <label
              htmlFor="profileImage"
              className="absolute -bottom-2 -right-2 bg-primary text-text p-3 rounded-full shadow-xl cursor-pointer hover:bg-highlight transition-all transform hover:scale-105 ring-4 ring-bg-light"
            ></label>
            <FaCamera className="text-xl" />
            <input
              type="file"
              id="profileImage"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold ">{formData.displayName}</h2>
          </div>
        </div>

        {/* Middle Column - Profile Information */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--bg-light)] rounded-xl shadow-md p-4 mt-2">
            <h2 className="text-xl font-bold mb-4">Teacher Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted">
                    ID
                    <span className="ml-2 text-sm text-muted">
                      {formData.id}
                    </span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted">
                    Display Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted">
                    Nrc Number
                  </label>
                  <input
                    type="text"
                    name="nrcNumber"
                    value={formData.nrcNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dob}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted">
                    Qualification
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:cursor-pointer transition duration-1000 hover:scale-105 text-white py-2 px-4 rounded-md hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Subject Management */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--bg-light)] rounded-xl shadow-md p-4 mt-2">
            <h2 className="text-xl font-bold mb-4">Manage Subjects</h2>

            {/* Current Subjects */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-text mb-2">
                Current Subjects
              </h3>
              {assignedSubjects.length === 0 ? (
                <p>No subject assigned yet</p>
              ) : (
                <div>
                  {assignedSubjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="flex items-center mb-1.5 justify-between bg-dark p-3 rounded border"
                    >
                      <div>
                        <p className="font-medium text">
                          {subject.subjectName}
                        </p>
                      </div>
                      <button className="hover:cursor-pointer" onClick={() => handleRemoveSubject(formData.id,subject.id)}>
                        <FaMinus />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Subject Section */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Add Subject</h3>
              <div className="relative mb-4">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="flex items-center mb-1.5 justify-between bg-dark p-3 rounded border"
                  >
                    <p>{subject.subjectName}</p>
                    <button className="hover:cursor-pointer" onClick={() => handleAddSubject(subject)}>
                        <FaPlus />
                      </button>
                  </div>
                ))}
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

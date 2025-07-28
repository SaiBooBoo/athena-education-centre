import { ChangeEvent, useEffect, useState } from "react";
import { SubjectDto } from "../../modal/dtos/dtos";
import { useNavigate, useParams } from "react-router-dom";
import { Gender } from "../../modal/dtos/parent.dto";
import axios from "axios";
import { FaCamera, FaEdit, FaUser } from "react-icons/fa";

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
    subjects: [] as string[],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchSubject, setSearchSubject] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [hasProfileImage, setHasProfileImage] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectDto[]>([]);
  const [allSubjects, setAllSubjects] = useState<string[]>([]);
  const [isAddingSubjects, setIsAddingSubjects] = useState(false);
  const [subject, setSubject] = useState<SubjectDto>();

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
        setAllSubjects(res.data);
      })
      .catch((err) => {
        console.error("Error fetching subjects: ", err);
      });
  }, [id]);

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

  const handleAddSubject = (subject: SubjectDto) => {
    if (!selectedSubjects.some((s) => s.id == subject.id)) {
      setSelectedSubjects((prev) => [...prev, subject]);
    }
  };

  const handleRemoveSubjecy = (subjectId: number) => {
    setSelectedSubjects((prev) => prev.filter((s) => s.id !== subjectId));
  };

  const handleSaveSubjects = async () => {
    setIsAddingSubjects(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/teachers/${id}/subjects/${subject.id}`
      );

      console.log("Subjects updated successfully: ", response.data);
      setSuccessMessage("Subjects updated successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsAddingSubjects(false);
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
        Edit Parent Profile
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
            <h2 className="text-xl font-bold text-teal-900">
              {formData.displayName}
            </h2>
          </div>
        </div>

        {/* Middle Column - Profile Information */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--bg-light)] rounded-xl shadow-md p-4 mt-2">
            Second
          </div>
        </div>

        {/* Right Column - Subject Management */}
        <div>Third</div>
      </div>
    </div>
  );
}

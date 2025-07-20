import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Gender } from "../../modal/dtos/parent.dto";
import axios from "axios";
import { ParentSummaryDto } from "../../modal/dtos/dtos";
import { FaCamera, FaExclamationTriangle, FaSave, FaUserPlus } from "react-icons/fa";


export default function StudentEditComponent() {

  const {id} = useParams<{id : string}>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: 0,
    username: "",
    password: "",
    displayName: "",
    gender: "MALE" as Gender,
    dob: "",
    address: "",
    grade: "",
    accountType: "student",
    profileImagePath: "",
    parents: [] as ParentSummaryDto[],
  })

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasProfileImage, setHasProfileImage] = useState(false);
  const [allParents, setAllParents] = useState<ParentSummaryDto[]>([]);
  const [parentSearch, setParentSearch] = useState("");
  const [parentError, setParentError] = useState<string | null>(null);
   useEffect(() => {
    if (!id) return;

    // Get Student by id
    axios
      .get(`http://localhost:8080/api/students/${id}`)
      .then((res) => {
        setFormData(res.data);
        setLoading(false);

        // Check if the image exists
        const image = new Image();
        image.src = `http://localhost:8080/api/students/${id}/profile-image`;
        image.onload = () => setHasProfileImage(true);
        image.onerror = () => setHasProfileImage(false);

      })
      .catch((err) => {
        setError("Could not load student");
        setLoading(false);
      });

    // Get all parents
    axios.get("http://localhost:8080/api/parents")
    .then((res) => {
      setAllParents(res.data);
    })
    .catch((err) => {
      console.error("Error fetching parents:", err);
    })
  }, [id]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
      setProfileImage(e.target.files[0])
    }
  }

  const handleAddParents = async () => {
    if(!id || formData.parents.length === 0 ) {
      alert("Please select at least one parent.");
      return;
    }

     setParentError(null); // Clear error if parents are selected
    try{
      const response = await axios.put(`http://localhost:8080/api/students/addParents/${id}`,
        {
          parents: formData.parents.map(parent => ({id: parent.id}))
        }
      );

      console.log("Parents added successfull:", response.data);
      alert("Parents added successfully!");
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      const updateResp = await axios.put(`http://localhost:8080/api/students/${id}`, formData);
      console.log("Student updated successfully: ", updateResp.data);
      
      if(profileImage){
        const imageData = new FormData();
        imageData.append("file", profileImage);

        const imageResp = await axios.put(`http://localhost:8080/api/students/${id}/update-image`, imageData,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        console.log("Image updated successfully: ", imageResp.data);
      }
      navigate("/studentDashboard")
      alert("Successfully updated student")
    } catch(err: any){
      setError(err.response?.data?.message || err.message);
    }
  }

  if(loading) return <p> Loading student data...</p>
  if(error) return <p className="text-red-500">{error}</p>

  const filteredParents  = allParents.filter(parent => {
              const query = parentSearch.toLowerCase();
              return (
                parent.displayName.toLowerCase().includes(query) ||
                parent.id.toString().includes(query)
              );
            });

  return (
   <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
        <div className="p-6 border-b border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Edit Student Profile
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Photo */}
        <div className="lg:col-span-1 flex flex-col items-center">
            <div className="relative mb-6">
              {hasProfileImage ? (
                <img 
                  src={`http://localhost:8080/api/students/${id}/profile-image`}
                  alt="Profile"
                  className="w-64 h-64 object-cover rounded-xl shadow-md border-4 border-white"
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              
              <label 
                htmlFor="profileImage"
                className="absolute bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-purple-700 transition-colors"
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
              <p className="font-bold text-xl text-gray-800">{formData.displayName}</p>
              <p className="text-gray-500 text-sm mt-2">Student ID: {id}</p>
            </div>
          </div>

          {/* Middle Column - Student Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                <input 
                  name="displayName" 
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input 
                  name="dob" 
                  value={formData.dob} 
                  type="date" 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                <input 
                  type="text" 
                  value={formData.grade} 
                  name="grade" 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input 
                type="text" 
                value={formData.address} 
                name="address" 
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
              />
            </div>
            
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 px-6 rounded-lg flex items-center justify-center font-medium hover:from-purple-700 hover:to-indigo-800 transition-all shadow-md"
              >
                <FaSave className="mr-2" />
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Column - Parent Management */}
          <div className="lg:col-span-1">
            <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
              <h3 className="font-semibold text-lg mb-4 flex items-center text-purple-800">
                <FaUserPlus className="mr-2 text-purple-600" />
                Manage Parents
              </h3>
              
               {/* Parent Error Message */}
              {parentError && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                  <FaExclamationTriangle className="mr-2 mt-1 text-red-500 flex-shrink-0" />
                  <span>{parentError}</span>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Parents</label>
                <input 
                  type="text" 
                  placeholder="Search by name or ID..." 
                  value={parentSearch} 
                  onChange={(e) => setParentSearch(e.target.value)} 
                  className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
                />
              </div>
              
              {/* Selected Parents */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-700">Selected Parents</h4>
                  <span className="text-sm bg-purple-600 text-white px-2 py-1 rounded-full">
                    {formData.parents.length} selected
                  </span>
                </div>
                {formData.parents.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {formData.parents.map((parent) => (
                      <div key={parent.id} className="bg-white p-3 rounded-lg border border-purple-200 flex justify-between items-center shadow-sm">
                        <div>
                          <p className="font-medium text-gray-800">{parent.displayName}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded">ID: {parent.id}</span>
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded">NRC: {parent.nrcNumber}</span>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              parents: prev.parents.filter(p => p.id !== parent.id)
                            }));
                          }}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-purple-100 text-purple-800 text-center py-4 rounded-lg border border-purple-200">
                    <div className="flex flex-col items-center">
                      <FaExclamationTriangle className="text-purple-500 mb-2" />
                      <span>No parents selected yet</span>
                      <p className="text-xs mt-1 text-purple-600">Select parents from the list below</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Parent List */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Available Parents</h4>
                <div className="max-h-60 overflow-y-auto border border-purple-300 rounded-lg">
                  {filteredParents.length > 0 ? (
                    <div className="space-y-2 p-2">
                      {filteredParents.map((parent) => {
                        const isChecked = formData.parents.some(p => p.id === parent.id);
                        
                        return (
                          <label 
                            key={parent.id} 
                            className={`flex items-start p-3 rounded-lg cursor-pointer ${
                              isChecked 
                                ? 'bg-purple-100 border border-purple-300' 
                                : 'hover:bg-purple-50'
                            } transition-colors`}
                          >
                            <input 
                              type="checkbox" 
                              checked={isChecked} 
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFormData(prev => {
                                  const updatedParents = checked ? 
                                  [...prev.parents, parent] :
                                  prev.parents.filter(p => p.id !== parent.id);
                                  return {...prev, parents: updatedParents}
                                })
                              }} 
                              className="mt-1 mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500"
                            />
                            <div className="flex-1">
                              <p className={`font-medium ${isChecked ? 'text-purple-800' : 'text-gray-800'}`}>
                                {parent.displayName}
                              </p>
                              <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 mt-1">
                                <span>ID: {parent.id}</span>
                                <span>NRC: {parent.nrcNumber}</span>
                                <span>DOB: {parent.dob}</span>
                                <span>Phone: {parent.phoneNumber}</span>
                              </div>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500 bg-purple-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-purple-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      No parents found matching your search
                    </div>
                  )}
                </div>
              </div>
              
              <button 
                type="button" 
                onClick={handleAddParents}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 px-4 rounded-lg flex items-center justify-center font-medium hover:from-purple-700 hover:to-indigo-800 transition-all shadow-md"
              >
                <FaUserPlus className="mr-2" />
                Add Selected Parents
              </button>
            </div>
          </div>
        </form>
        
      </div>
    </div>

  )
}
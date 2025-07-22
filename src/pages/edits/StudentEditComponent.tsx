import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Gender } from "../../modal/dtos/parent.dto";
import axios from "axios";
import { ParentSummaryDto } from "../../modal/dtos/dtos";
import { FaCamera, FaExclamationTriangle, FaInfoCircle, FaSave, FaSearch, FaUser, FaUserFriends, FaUserPlus } from "react-icons/fa";


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
  const [showModal, setShowModal] = useState(false);
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
  <div className="max-w-9xl mx-auto p-6">
  <div className="bg-[var(--bg-light)] rounded-xl shadow-xl overflow-hidden border-2 border-highlight/30">
    {/* Header with accent gradient */}
    <div className="p-6 bg-gradient-to-r from-primary/20 to-secondary/10 border-b-2 border-highlight/50">
      <h2 className="text-2xl font-bold text-text flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              className="w-64 h-64 object-cover rounded-xl shadow-lg border-4 border-bg ring-4 ring-primary/20"
            />
          ) : (
            <div className="bg-bg border-2 border-dashed border-highlight rounded-xl w-64 h-64 flex items-center justify-center">
              <span className="text-text-muted">No Image</span>
            </div>
          )}
          
          <label 
            htmlFor="profileImage"
            className="absolute -bottom-2 -right-2 bg-primary text-bg-dark p-3 rounded-full shadow-xl cursor-pointer hover:bg-highlight transition-all transform hover:scale-105 ring-2 ring-bg"
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
        
        <div className="text-center mt-4 bg-bg p-4 rounded-xl shadow-inner border border-highlight/20 w-full">
          <p className="font-bold text-xl text-text">{formData.displayName}</p>
          <p className="text-text-muted text-sm mt-2">Student ID: {id}</p>
        </div>
      </div>

      {/* Middle Column - Student Information */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-bg p-6 rounded-xl shadow-inner border border-highlight/20">
          <h3 className="font-semibold text-lg mb-4 flex items-center text-text">
            <FaUser className="mr-2 text-primary" />
            Student Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Display Name</label>
              <input 
                name="displayName" 
                value={formData.displayName}
                onChange={handleChange}
                className="w-full bg-bg-light border-2 border-highlight/30 rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary focus:border-highlight shadow-inner"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Date of Birth</label>
              <input 
                name="dob" 
                value={formData.dob} 
                type="date" 
                onChange={handleChange} 
                className="w-full bg-bg-light border-2 border-highlight/30 rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary focus:border-highlight shadow-inner"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Gender</label>
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange} 
                className="w-full bg-bg-light border-2 border-highlight/30 rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary focus:border-highlight shadow-inner"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Grade</label>
              <input 
                type="text" 
                value={formData.grade} 
                name="grade" 
                onChange={handleChange}
                className="w-full bg-bg-light border-2 border-highlight/30 rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary focus:border-highlight shadow-inner"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-primary mb-1">Address</label>
            <input 
              type="text" 
              value={formData.address} 
              name="address" 
              onChange={handleChange}
              className="w-full bg-bg-light border-2 border-highlight/30 rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary focus:border-highlight shadow-inner"
            />
          </div>
          
        </div>
      </div>

      {/* Right Column - Parent Management */}
      <div className="lg:col-span-1">
        <div className="bg-gradient-to-br from-bg-light to-bg-dark rounded-xl p-5 border-2 border-highlight/30 shadow-lg">
          <h3 className="font-semibold text-lg mb-4 flex items-center text-text">
            <FaUserFriends className="mr-2 text-secondary" />
            Manage Parents
          </h3>
          
          {/* Parent Error Message */}
          {parentError && (
            <div className="mb-4 bg-danger/20 border-2 border-danger/30 text-danger px-4 py-3 rounded-lg flex items-start">
              <FaExclamationTriangle className="mr-2 mt-1 text-danger flex-shrink-0" />
              <span>{parentError}</span>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary mb-1">Search Parents</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by name or ID..." 
                value={parentSearch} 
                onChange={(e) => setParentSearch(e.target.value)} 
                className="w-full bg-bg border-2 border-highlight/30 rounded-xl px-4 py-2 pl-10 text-text focus:ring-2 focus:ring-secondary focus:border-highlight shadow-inner"
              />
              <FaSearch className="absolute left-3 top-3 text-text-muted" />
            </div>
          </div>
          
          {/* Selected Parents */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-secondary">Selected Parents</h4>
              <span className="text-sm bg-secondary text-bg-dark px-2 py-1 rounded-full font-bold">
                {formData.parents.length} selected
              </span>
            </div>
            {formData.parents.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {formData.parents.map((parent) => (
                  <div key={parent.id} className="bg-bg p-3 rounded-xl border-2 border-highlight/30 flex justify-between items-center shadow-md">
                    <div>
                      <p className="font-bold text-text">{parent.displayName}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="bg-highlight/10 text-text text-xs px-2 py-0.5 rounded">ID: {parent.id}</span>
                        <span className="bg-highlight/10 text-text text-xs px-2 py-0.5 rounded">NRC: {parent.nrcNumber}</span>
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
                      className="text-danger hover:text-danger/80 p-1 rounded-full hover:bg-danger/10 transform hover:scale-110 transition-transform"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-bg-light/50 text-text-muted text-center py-4 rounded-xl border-2 border-dashed border-highlight/30">
                <div className="flex flex-col items-center">
                  <FaExclamationTriangle className="text-text-muted mb-2 text-2xl" />
                  <span className="font-medium">No parents selected</span>
                  <p className="text-xs mt-1 text-text-muted">Select parents from the list below</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Parent List */}
          <div className="mb-4">
            <h4 className="font-medium text-secondary mb-2">Available Parents</h4>
            <div className="max-h-60 overflow-y-auto border-2 border-highlight/30 rounded-xl bg-bg-light/20">
              {filteredParents.length > 0 ? (
                <div className="space-y-2 p-2">
                  {filteredParents.map((parent) => {
                    const isChecked = formData.parents.some(p => p.id === parent.id);
                    
                    return (
                      <label 
                        key={parent.id} 
                        className={`flex items-start p-3 rounded-lg cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-highlight/10 border-2 border-primary shadow-sm' 
                            : 'hover:bg-highlight/5 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center h-5">
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
                            className="h-4 w-4 text-primary focus:ring-primary border-2 border-highlight"
                          />
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <p className={`font-bold truncate ${isChecked ? 'text-primary' : 'text-text'}`}>
                            {parent.displayName}
                          </p>
                          <div className="grid grid-cols-2 gap-1 text-xs text-text-muted mt-1">
                            <span className="truncate">ID: {parent.id}</span>
                            <span className="truncate">NRC: {parent.nrcNumber}</span>
                            <span className="truncate">DOB: {parent.dob}</span>
                            <span className="truncate">Phone: {parent.phoneNumber}</span>
                          </div>
                        </div>
                      </label>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-text-muted">
                  <FaSearch className="h-8 w-8 mx-auto text-highlight mb-2" />
                  <span className="font-medium">No parents found</span>
                  <p className="text-xs mt-1">Try a different search term</p>
                </div>
              )}
            </div>
          </div>
          
          <button 
            type="button" 
            onClick={handleAddParents}
            className="w-full bg-gradient-to-r from-secondary to-info text-bg-dark py-3 px-4 rounded-xl flex items-center justify-center font-bold hover:from-secondary/90 hover:to-info/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FaUserPlus className="mr-2" />
            Add Selected Parents
          </button>
        </div>
      </div>
    </form>
    
    {/* Save Button at Bottom */}
    <div className="border-t-2 border-highlight/30 p-6 bg-gradient-to-r from-bg-light to-bg-dark/50">
      <div className="flex justify-between items-center">
        <div className="text-sm text-text-muted flex items-center">
          <FaInfoCircle className="mr-2 text-primary" />
          <span>Make sure to save all changes before leaving</span>
        </div>
        <button 
          type="button"
          onClick={handleSubmit}
          className="bg-gradient-to-r from-primary to-secondary text-bg-dark py-3 px-8 rounded-xl flex items-center justify-center font-bold hover:from-primary/90 hover:to-secondary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <FaSave className="mr-2" />
          Save All Changes
        </button>
        
      </div>
    </div>
  </div>
</div>
  )
}
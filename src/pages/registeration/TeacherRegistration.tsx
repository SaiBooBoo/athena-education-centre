import { useState } from "react"
import { Gender } from "../../modal/dtos/parent.dto"
import { useNavigate } from "react-router-dom";


export default function TeacherRegistration() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    displayName: "",
    nrcNumber: "",
    qualification: "",
    dob: "",
    phoneNumber: "",
    address: "",
    gender: "MALE" as Gender,
    accountType: "teacher",
    subject: [] as string[]
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successTeacherId, setSuccessTeacherId] = useState<number | null>(null);
  const navigate = useNavigate();
  return (
    <div>TeacherRegistration</div>
  )
}

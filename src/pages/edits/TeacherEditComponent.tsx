import { useState } from "react";
import { SubjectDto } from "../../modal/dtos/dtos";
import { useNavigate, useParams } from "react-router-dom";

export default function TeacherEditComponent() {

  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [searchSubject, setSearchSubject] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [hasProfileImage, setHasProfileImage] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectDto[]>([]);
  



  return (
    <div>TeacherEditComponent</div>
  )
}

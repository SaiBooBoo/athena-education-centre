import axios from "axios";
import type { StudentDto } from "../modal/dtos/student.dto";


const BACKEND_URL = "http://localhost:8080/api/students";


export const getAllStudents = () => axios.get(BACKEND_URL);

export const getStudentById = (id: number) => axios.get(`{BACKEND_URL}/${id}`)

export const getStudentImageById = (id: number) => axios.get(`{BACKEND_URL}/${id}/image`)

export async function getStudent(id: number): Promise<StudentDto> {
  const response = await fetch(`${BACKEND_URL}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch student');
  return response.json();
}

export async function getStudentProfileImage(id: number): Promise<Blob> {
  const response = await fetch(`${BACKEND_URL}/${id}/image`);
  if (!response.ok) throw new Error('Failed to fetch student profile image');
  return response.blob();
}
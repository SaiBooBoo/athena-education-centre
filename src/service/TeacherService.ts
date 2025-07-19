import axios from "axios";

const BACKEND_URL = "http://localhost:8080/api/teachers";

export const getAllTeachers = () => axios.get(BACKEND_URL);

export const getTeacherById = (id:number) => axios.get(`${BACKEND_URL}/${id}`);

export const getTeacherImageById = (id:number) => axios.get(`${BACKEND_URL}/${id}/image`);
import axios from "axios";

export const BACKEND_URL = 'http://localhost:8080/api/parents';

export const getAllParents = () => axios.get(BACKEND_URL);

export const getParentById = (id: number) => axios.get(`${BACKEND_URL}/${id}`);

export const getParentImageById = (id: number) => axios.get(`${BACKEND_URL}/${id}/image`);


import axios from "axios";
import type { RegisterDto } from "../modal/dtos/register.dto";

export const ATHENA_API_BACKEND_URL = "http://localhost:8080/api/auth";

export const login = (username:string, password:string) => { return axios.post(ATHENA_API_BACKEND_URL + "/login", {username, password})};

export const register = (registerDto : RegisterDto) => { return axios.post(ATHENA_API_BACKEND_URL + "/register", registerDto)};
    
export function useAuth(){
    const username = sessionStorage.getItem("username");
    const role = sessionStorage.getItem("role");
    return {username, role };
}

export const fetchAccountType = async (username: string): Promise<string> => {
  const response = await axios.get(`${ATHENA_API_BACKEND_URL}/accountType/${username}`);
  return response.data;
}


export const setLoggedInUsername = (username:string) =>{
    sessionStorage.setItem("username", username);
}

export const getLoggedInUsername = () =>{
    return sessionStorage.getItem("username");
}

export const setToken = (token:string) => {
    sessionStorage.setItem("token", token);
}

export const getToken = () => {
    return sessionStorage.getItem("token");
}

export const isLoggedIn = () => {
    return getLoggedInUsername() != null;
}

export const setLoggedUserRole = (role:string) => {
    return sessionStorage.setItem("role", role);
}

export const getLoggedUserRole = () => {
    return sessionStorage.getItem("role");
}



export const isTeacher = () => {
    return getLoggedUserRole() === "ROLE_TEACHER";
}

export const isStudent = () => {
    return getLoggedUserRole() === "ROLE_STUDENT";
}

export const isAdmin = () => {
    return getLoggedUserRole() === "ROLE_ADMIN";
}

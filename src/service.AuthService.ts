import axios from "axios";

const ATHENA_API_BACKEND_URL = "http://localhost:8080/api/auth";

export const login = (username:string, password:string) =>
    axios.post(ATHENA_API_BACKEND_URL + "/login", {username, password});


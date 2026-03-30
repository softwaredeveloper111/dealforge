import axios from "axios"




const instance = axios.create({
  baseURL:  import.meta.env.BASEURL || "http://localhost:3000",
  withCredentials: true, // Include cookies in requests
});





export const registerAPI = async (userData) => {
  try {
    const response = await instance.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};




export const loginAPI = async (userData) => {
  try {
    const response = await instance.post("/api/auth/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};





export const getMeAPI = async () => {
  try {
    const response = await instance.get("/api/auth/me")
    return response.data;
  } catch (error) {
    throw error;
  }
};





export const logoutAPI = async ()=>{
  try {
    const response = await instance.post("/api/auth/logout")
    return response.data;
  } catch (error) {
    throw error;
  }
}
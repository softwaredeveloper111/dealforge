import axios from "axios";



const instance = axios.create({
  baseURL: import.meta.env.BASEURL || "http://localhost:3000",
  withCredentials:true
});




export const getAllProductAPI = async (page) => {
  try {
    const response = await instance.get("/api/products", { page });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getSingleProductAPI = async (productId) => {
  try {
    const response = await instance.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};




export const startNewSessionAPI = async (productId) => {
  try {
    const response = await instance.post(`/api/sessions/start`, { productId });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const sendUserMessageAPI = async (sessionId, message) => {
  try {
    const response = await instance.post(`/api/sessions/${sessionId}/message`, { message });
    return response.data;
  } catch (error) {
    throw error;
  }
};





export const acceptDealAPI = async (sessionId) => {
  try {
    const response = await instance.post(`/api/sessions/${sessionId}/accept`);
    return response.data;
  } catch (error) {
    throw error;
  }
};





export const abandonDealAPI = async (sessionId) => {
  try {
    const response = await instance.post(`/api/sessions/${sessionId}/abandon`);
    return response.data;
  } catch (error) {
    throw error;
  }
};





export const getUserSessionsAPI = async () => {
  try {
    const response = await instance.get(`/api/sessions/my`);
    return response.data;
  } catch (error) {
    throw error;
  }
};






export const getUserSpecificSessionAPI = async (sessionId) => {
  try {
    const response = await instance.get(`/api/sessions/${sessionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};





export const globalLeaderBoardAPI = async () => {
  try {
    const response = await instance.get(`/api/leaderboard`);
    return response.data;
  } catch (error) {
    throw error;
  }
};




export const userRankAPI = async () => {
  try {
    const response = await instance.get(`/api/leaderboard/my-rank`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
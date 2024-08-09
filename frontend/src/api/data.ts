import axios from "axios";


export const getData = async () => {

  try {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BACKEND_URL}/topic/bulk`, {
      headers: {
        'Authorization': token
      }
    });
    console.log(response)
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error?.[0] ||
      error.response?.data.message ||
      error.response?.data?.error ||
      'An error occurred';
  
    return { error: errorMessage };
  }
};


export const getUserTopics = async () => {

  try {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BACKEND_URL}/user/profile`, {
      headers: {
        'Authorization': token
      }
    });
    console.log(response.data)
    return response.data;
  
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error?.[0] ||
      error.response?.data.message ||
      error.response?.data?.error ||
      'An error occurred';
  
    return { error: errorMessage };
  }
};


export const askQuestion = async () => {

  try {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BACKEND_URL}/questions/bulk`, {
      headers: {
        'Authorization': token
      }
    });

    return response.data;
  
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error?.[0] ||
      error.response?.data.message ||
      error.response?.data?.error ||
      'An error occurred';
  
    return { error: errorMessage };
  }
};


export const  getNotifications= async () => {

  try {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BACKEND_URL}/topic/user/notifications`, {
      headers: {
        'Authorization': token
      }
    });

    return response.data;
  
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error?.[0] ||
      error.response?.data.message ||
      error.response?.data?.error ||
      'An error occurred';
  
    return { error: errorMessage };
  }
};


import axios from "axios";


export const signup = async (
  email: string,
  password: string,
  userName: string
) => {
  try {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(`${BACKEND_URL}/user/signup` , {
      email,
      password,
      userName,
    });
    localStorage.setItem('isUserLoggedIn', 'true');
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

export const signin = async (
  email: string,
  password: string,

) => {
  try {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(`${BACKEND_URL}/user/signin` , {
      email,
      password,
 
    });
    localStorage.setItem('isUserLoggedIn', 'true');
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



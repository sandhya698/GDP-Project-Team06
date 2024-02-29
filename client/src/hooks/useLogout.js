import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { logoutRoute } from "../utils/ApiRoutes";
import { toastOptions } from "../utils/toasOptions";
import { toast } from "react-toastify";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();
  
  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${logoutRoute}/${user?._id}`, {
        withCredentials: true,
        "Accept": "application/json",
        "Content-Type": "application/json"
      });
      if (data.success) {
        toast.success('Successfully logged out', toastOptions);
        dispatch({ type: 'LOGOUT' });
        navigate('/', { replace: true });
      }
    }
    catch (err) {
      setError(err.response.data.error);
      toast.error('Logout Failed!!', toastOptions);
    }
    finally {
      setIsLoading(false);
    }
  }

  return { logout, error, isLoading };
};
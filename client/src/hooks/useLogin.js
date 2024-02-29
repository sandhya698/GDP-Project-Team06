import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toastOptions } from "../utils/toasOptions";
import { toast } from "react-toastify";
import { loginRoute } from "../utils/ApiRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const useLogin = () => {

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async ({ email, password }) => {
    setIsLoading(true);
    setError(null);

    if (!email || !password) {
      toast.error("email and password are required", toastOptions);
    }
    else {
      try {
        const { data } = await axios.post(loginRoute,
          { email, password },
          { withCredentials: true }
        );
        
        if (data.success) {
          toast.success('Successfully logged In', toastOptions);
          dispatch({ type: 'LOGIN', payload: { ...data } });
          navigate('/dashboard');
        }
        
      }
      catch (err) {
        setError(err.response.data.error);
        toast.error(err.response.data.message, toastOptions);
      }
      finally {
        setIsLoading(false);
      }
    }
  }

  return { login, isLoading, error };
}

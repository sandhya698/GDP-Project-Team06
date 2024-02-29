import { toast } from "react-toastify";
import { toastOptions } from "../utils/toasOptions";
import { useState } from "react";
import axios from "axios";
import { registerRoute } from "../utils/ApiRoutes";

export const useRegister = () => {

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const validateUserDetails = (userDetails) => {
    const { name, email, password, cpassword, userType } = userDetails;

    let validated = true;

    const nameRegex = /^[a-zA-z0-9_ ]{3,25}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*-])[a-zA-Z\d.!@#$%^&*-]{8,16}$/;

    toast.dismiss();

    if (!nameRegex.test(name)) {
      toast.error(
        "Username should be greater than 3 chars. Special chars allowed space and underscore",
        toastOptions
      );
      validated = false;
    }

    if (!emailRegex.test(email)) {
      toast.error(
        "Invalid email",
        toastOptions
      );
      validated = false;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password should be min of 8 and max 16. Should follow standard password rules",
        toastOptions
      );
    validated = false;
    }

    if (!password.match(cpassword)) {
      toast.error(
        "Passwords does not match",
        toastOptions
      );
      validated = false;
    }

    if (userType === '') {
      toast.error(
        "Who are you?",
        toastOptions
      );
      validated = false;
    }

    return validated;
  }

  const register = async (userDetails) => {
    setIsLoading(true);
    setError(null);
    
    if (validateUserDetails(userDetails)) {
      try {
        const res = await axios.post(registerRoute, {
          ...userDetails
        });
  
        if(res.data.success) {
          toast.success('You are now a Transfuser!!', toastOptions);
        };
      }
      catch (err) {
        setError(err.response.data.error);
        toast.error(err.response.data.message, toastOptions);
      }
      finally {
        setIsLoading(false);
      }
      
    } else {
      setError(false);
    }
    
  };

  return {register, isLoading, error}
}
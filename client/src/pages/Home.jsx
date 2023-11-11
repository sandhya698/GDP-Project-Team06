import React, { useCallback, useEffect, useState } from 'react'
import NavigationBar from '../components/NavigationBar'
import axios from 'axios';
import { authenticate } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkUserAuthentication = useCallback(async () => {
    try {
      console.log('autnentcaitng')
      const res = await axios.get(authenticate, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res.data);
      setCurrentUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }
    catch (err) {
      console.log(err.response.data);
      setLoading(false);
      if (!err.response.data.status) {
        navigate('/login');
      }
    }
  }, [navigate]);

  useEffect(() => {
    checkUserAuthentication();
  }, [checkUserAuthentication, navigate]);
  
  return (
    <>
      {
        loading ?
          (
            <p>Loading...</p>
          ) :
          (
            <>
              <NavigationBar
                isAuthenticated={isAuthenticated}
                userId = {currentUser._id}
              />
              <div><p>How are you feeling today { currentUser.name }?</p></div>
            </>
          )
      }
    </>
  )
}

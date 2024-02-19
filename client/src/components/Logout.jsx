import React from 'react'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';
import { logoutRoute } from '../utils/ApiRoutes';
import { toastOptions } from '../utils/toasOptions';
import { useGlobalState } from '../reducer/GlobalState';

export const Logout = ({userId}) => {

  const navigate = useNavigate();
  const { dispatch } = useGlobalState();

  const handleLogout = () => {
    axios.get(`${logoutRoute}/${userId}`, {
      withCredentials: true,
      "Accept": "application/json",
      "Content-Type": "application/json"
    })
      .then((res) => {
        toast.success('Successfully logged out', toastOptions);
        dispatch({ type: 'REMOVE_STATE', payload: null });
        navigate('/', { replace: true });
        if (res.status !== 200) {
          throw new Error(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'REMOVE_STATE' });
        toast.error('Logout Failed!!', toastOptions);
      });
  }

  return (
    <>
      <NavLink className="nav-link" onClick={handleLogout}><span className="fas fa-sign-out-alt  fs-4"></span></NavLink>
    </>
  )
}
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

export const Logout = () => {

  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <>
      <NavLink className="nav-link" onClick={handleLogout}><span className="fas fa-sign-out-alt  fs-4"></span></NavLink>
    </>
  )
}
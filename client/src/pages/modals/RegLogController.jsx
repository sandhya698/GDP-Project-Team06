import React, { useState } from 'react'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal';

export const RegLogController = () => {
  const [userRegistered, setUserRegistered] = useState(true);
  const handleUser = (value) => {
    setUserRegistered(value);
  }
  return (
    <>
      {
        userRegistered ? 
          <LoginModal 
          handleUser={handleUser} /> : 
          <RegisterModal 
          handleUser={handleUser} />
      }  
    </>
  )
}

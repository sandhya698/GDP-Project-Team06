import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { Button } from 'react-bootstrap';

export const UserProfile = ({isEditing}) => {

  const { user } = useAuthContext();

  const [editedUser, setEditedUser] = useState({ ...user });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    return setEditedUser({ ...editedUser, [name]: value });
  };

  
  return (
    <>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
          <input disabled={!isEditing} readOnly={!isEditing} type="text" className="form-control" id="name" />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input disabled={!isEditing} readOnly={!isEditing} type="email" className="form-control" id="email" />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
        <div className="col-sm-10">
          <input disabled={!isEditing} readOnly={!isEditing} type="number" className="form-control" id="phone" />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="bloodGroup" className="col-sm-2 col-form-label">Blood Group</label>
        <div className="col-sm-10">
          <input disabled={!isEditing} readOnly={!isEditing} type="text" className="form-control" id="bloodGroup" />
        </div>
      </div>  
    </>
  )
}

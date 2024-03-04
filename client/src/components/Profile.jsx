import React, { useState } from 'react'
import { Button, Modal, Tab, Tabs } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { userUpdateRoute } from '../utils/ApiRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { userToastOptions } from '../utils/toasOptions';

export const Profile = ({ show, setShow }) => {

  const { user, dispatch } = useAuthContext();
  
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({ ...user });
  const [securityData, setSecurityData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [key, setKey] = useState('user');

  const api = axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setUserData({ ...user });
    setSecurityData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      if (key === 'user') {
        const { data } = await api.post(userUpdateRoute, {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        });

        toast.success(data.message, userToastOptions);
        setUserData({ ...data.updatedUser });
        dispatch({ type: 'UPDATE_USER', payload: {user: data.updatedUser} });
        
      } else if (key === 'security') {
        console.log("saving security data: ", securityData);
      }

    }
    catch (error) {
      console.log("error: ", error.response);
    }
    finally {
      setIsEditing(false);
    }
   

  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    return setUserData({ ...userData, [name]: value });
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    return setSecurityData({ ...securityData, [name]: value });
  };

  const handleModalClose = () => {
    setShow(false);
    setIsEditing(false);
  }

  const handleTabChange = (k) => {
    setKey(k);
    setIsEditing(false);
    handleCancelClick();
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleModalClose}
        backdrop="static"
        size="lg"
        aria-labelledby="about-user-profile"
      >
        <Modal.Header closeButton>
          <Modal.Title id="about-user-profile">
            My Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            id="profile-tabs"
            activeKey={key}
            onSelect={handleTabChange}
            className="mb-3"
          >
            <Tab eventKey="user" title="User">
              <>
                <div className="row mb-3">
                  <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                  <div className="col-sm-10">
                    <input disabled={!isEditing} readOnly={!isEditing} onChange={handleUserChange} value={userData.name} type="text" className="form-control" name="name" />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <input disabled={!isEditing} readOnly={!isEditing} onChange={handleUserChange} value={userData.email} type="email" className="form-control" name="email" />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                  <div className="col-sm-10">
                    <input disabled={!isEditing} readOnly={!isEditing} onChange={handleUserChange} value={userData.phone || ''} type="number" className="form-control" name="phone" />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="bloodGroup" className="col-sm-2 col-form-label">Blood Group</label>
                  <div className="col-sm-10">
                    <input disabled readOnly value={userData.bloodGroup} type="text" className="form-control" name="bloodGroup" />
                  </div>
                </div>  
              </>
            </Tab>
            <Tab eventKey="security" title="Security">
              <>
                <div className="row mb-3">
                  <label htmlFor="oldPassword" className="col-sm-3 col-form-label">Old Password</label>
                  <div className="col-sm-9">
                    <input type="password" onChange={handleSecurityChange} className="form-control" name="oldPassword" />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="newPassword" className="col-sm-3 col-form-label">New Password</label>
                  <div className="col-sm-9">
                    <input type="password" onChange={handleSecurityChange} className="form-control" name="newPassword" />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="confirmPassword" className="col-sm-3 col-form-label">Confirm Password</label>
                  <div className="col-sm-9">
                    <input type="password" onChange={handleSecurityChange} className="form-control" name="confirmPassword" />
                  </div>
                </div>
              </>
            </Tab>
          </Tabs>
        </Modal.Body>
      <Modal.Footer>
        { key === 'user' ? !isEditing ? (
          <Button variant="primary" onClick={handleEditClick}>
            Edit
          </Button>
        ) : (
          <>
            <Button variant="secondary" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveClick}>
              Save
            </Button>
          </>
          ) : 
          <Button variant="primary" onClick={handleSaveClick}>
              Save
            </Button>
        }
      </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

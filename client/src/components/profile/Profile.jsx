import React, { useState } from 'react'
import { Button, Modal, Tab, Tabs } from 'react-bootstrap';
import { useAuthContext } from '../../hooks/useAuthContext';
import { UserProfile } from './UserProfile';
import { SecurityProfile } from './SecurityProfile';

export const Profile = ({ show, setShow }) => {

  const { user } = useAuthContext();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isUserEditing, setIsUserEditing] = useState(false);
  const [isSecurityEditing, setIsSecurityEditing] = useState(false);
  const [userData, setUserData] = useState({ ...user });
  const [securityData, setSecurityData] = useState({ ...user });
  const [key, setKey] = useState('user');

  const handleEditClick = () => {
    setIsEditing(true);
    if (key === 'user') {
      setIsUserEditing(true);
    } else if (key === 'security') {
      setIsSecurityEditing(true);
    }
  };

  const resetEditingStates = () => {
    setIsEditing(false);
    setIsUserEditing(false);
    setIsSecurityEditing(false);
  }

  const handleCancelClick = () => {
    setUserData({ ...user });
    setSecurityData({ ...user });
    resetEditingStates();
  };

  const handleSaveClick = () => {
    // Perform save logic with editedUser data
    if (key === 'user') {
      console.log("saving user data: ", userData);
    } else if (key === 'security') {
      console.log("saving security data: ", securityData);
    }

    resetEditingStates();
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    console.log('first')
    return setUserData({ ...userData, [name]: value });
  };
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    return setSecurityData({ ...securityData, [name]: value });
  };

  const handleModalClose = () => {
    setShow(false);
    resetEditingStates();
  }

  const handleTabChange = (k) => {
    setKey(k);
    resetEditingStates();
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
              <UserProfile
                isEditing={isUserEditing}
                userData={userData}
                handleChange={handleUserChange} />
            </Tab>
            <Tab eventKey="security" title="Security">
              <SecurityProfile
                isEditing={isSecurityEditing}
                securityData={securityData}
                handleChange={handleSecurityChange} />
            </Tab>
          </Tabs>
        </Modal.Body>
      <Modal.Footer>
        {!isEditing ? (
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
        )}
      </Modal.Footer>
      </Modal>
    </>
  );
}

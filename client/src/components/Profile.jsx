import React, { useState } from 'react'
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { changePasswordRoute, userUpdateRoute } from '../utils/ApiRoutes';
import { toast } from 'react-toastify';
import { userToastOptions } from '../utils/toasOptions';

export const Profile = () => {

  const { user, dispatch } = useAuthContext();
  
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({ ...user });
  const [securityData, setSecurityData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [key, setKey] = useState('user');

  const isSecurityEmpty = Object.values(securityData).every(value => value === "");

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
        
      }
      else if (key === 'security') {
        console.log("saving security data: ", securityData);
        const { data } = await api.post(changePasswordRoute, {
          _id: user._id,
          oldPassword: securityData.oldPassword,
          newPassword: securityData.newPassword,
        });

        setSecurityData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        toast.success(data.message, userToastOptions);
      }

    }
    catch (error) {
      toast.error(error.response.data.message, userToastOptions);
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

  const handleTabChange = (k) => {
    setKey(k);
    setIsEditing(false);
    handleCancelClick();
  }

  return (
    <>
      <Container className='p-5 d-flex flex-column ' style={{ height: '100vh', overflowY: 'auto' }} >
        <Row>
          <h3 className="text-left fs-1 mb-3 text-capitalize">My Profile</h3>
        </Row>
        <Col sm={6} md={6}>
          <Tabs
            id="profile-tabs"
            activeKey={key}
            onSelect={handleTabChange}
            className="mb-3"
          >
            <Tab eventKey="user" title="User">
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="name">
                  <Form.Label column sm={3}>
                    Name
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control disabled={!isEditing} readOnly={!isEditing} className='border-2' onChange={handleUserChange} value={userData.name} type="text" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="email">
                  <Form.Label column sm={3}>
                    Email
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control disabled={!isEditing} readOnly={!isEditing} className='border-2' onChange={handleUserChange} value={userData.email} type="email" name="email" />
                  </Col>
                </Form.Group>
                    
                <Form.Group as={Row} className="mb-3" controlId="phone">
                  <Form.Label column sm={3}>
                    Phone
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control className='border-2' disabled={!isEditing} readOnly={!isEditing} onChange={handleUserChange} value={userData.phone || ''} type="number" name="phone" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="bloodGroup">
                  <Form.Label column sm={3}>
                    Blood Group
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control disabled readOnly className='border-2'  name="bloodGroup" type="text" value={user.bloodGroup} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col className='d-flex flex-row-reverse gap-3' >
                  { !isEditing ? (
                      <Button variant="primary" onClick={handleEditClick}>
                        Edit
                      </Button>
                    ) : (
                      <>
                        <Button variant="primary" onClick={handleSaveClick}>
                          Save
                        </Button>
                        <Button variant="secondary" onClick={handleCancelClick}>
                          Cancel
                        </Button>
                      </>
                      )
                    }
                  </Col>
                </Form.Group>
              </Form>
            </Tab>
            <Tab eventKey="security" title="Security">
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="oldPassword">
                  <Form.Label column sm={4}>
                    Old Password
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control className='border-2' type="password" onChange={handleSecurityChange} value={securityData.oldPassword} name="oldPassword" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="newPasssword">
                  <Form.Label column sm={4}>
                    New Password
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control className='border-2' type="password" onChange={handleSecurityChange} value={securityData.newPassword} name="newPassword" />
                  </Col>
                </Form.Group>
                    
                <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
                  <Form.Label column sm={4}>
                    Confirm Passsword
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control className='border-2' type="password" onChange={handleSecurityChange} value={securityData.confirmPassword}  name="confirmPassword" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Col  className='d-flex flex-row-reverse gap-3' >
                  { !isSecurityEmpty ? 
                      <>
                        <Button variant="primary" onClick={handleSaveClick}>
                          Save
                        </Button>
                      </>
                      : <></>
                    }
                  </Col>
                </Form.Group>
              </Form>
            </Tab>
          </Tabs>
          </Col>
      </Container> 
    </>
  );
}

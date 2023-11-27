import React, { useCallback, useEffect, useState } from 'react'
import NavigationBar from '../components/NavigationBar'
import axios from 'axios';
import { authenticate } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Sidebar } from '../components/Sidebar';

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
              <Container fluid >
                <Row className="full-height-row">
                  <Col sm={2} md={3} lg={2} className='ps-0'>
                    <Sidebar
                      userType={currentUser.userType} />
                  </Col>
                  <Col sm={10} md={9} lg={10}>
                  <div><p>How are you feeling today { currentUser.name }?</p></div>
                  </Col>
                </Row>
              </Container>
            </>
          )
      }
    </>
  )
}

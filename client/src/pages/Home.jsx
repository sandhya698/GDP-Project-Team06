import React, { useCallback, useEffect, useState } from 'react'
import NavigationBar from '../components/NavigationBar'
import axios from 'axios';
import { authenticate } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Sidebar } from '../components/Sidebar';
import Dashboard from './homePage/Dashboard';
import LoadingSpinner from '../components/LoadingSpinner';

export const Home = () => {

  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const PageToRedner = () => {
    if (currentPage === 'home') {
      return (
        <Dashboard />
      )
    }
    else if (currentPage === 'patient'){
      return (
        <h1>Patient Page</h1>
      )
    }
    else if (currentPage === 'inventory') {
      return (
        <h1>Inventory Page</h1>
      )
    }
    else if (currentPage === 'donations'){
      return (
        <h1>Donation Page</h1>
      )
    }
    else if (currentPage === 'donor'){
      return (
        <h1>Donor Page</h1>
      )
    }
  }
  
  return (
    <>
      {
        loading ?
          (
            <LoadingSpinner />
          ) :
          (
            <>
              <NavigationBar
                isAuthenticated={isAuthenticated}
                userId = {currentUser._id}
              />
              <Container fluid >
                <Row className="full-height-row">
                  <Col sm={2} md={3} lg={2} className='p-0'>
                    <Sidebar
                      userType={currentUser.userType}
                      pageChange={handlePageChange}/>
                  </Col>
                  <Col sm={10} md={9} lg={10} className='p-0'>
                    <PageToRedner />
                  </Col>
                </Row>
              </Container>
            </>
          )
      }
    </>
  )
}

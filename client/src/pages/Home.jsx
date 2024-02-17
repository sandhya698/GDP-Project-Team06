import React, { useCallback, useEffect, useState } from 'react'
import NavigationBar from '../components/NavigationBar'
import axios from 'axios';
import { authenticate } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Sidebar } from '../components/Sidebar';
import Dashboard from './homePage/Dashboard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Donor } from './homePage/Donor';
import { Patient } from './homePage/Patient';
import { Donations } from './homePage/Donations';
import { Requests } from './homePage/Requests';
import Inventory from './homePage/Inventory';

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
    }
    catch (err) {
      console.log(err.response.data);
      if (!err.response.data.status) {
        navigate('/login');
      }
    }
    finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkUserAuthentication();
  }, [checkUserAuthentication]);

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
        <Patient />
      )
    }
    else if (currentPage === 'inventory') {
      return (
        <Inventory />
      )
    }
    else if (currentPage === 'donations'){
      return (
        <Donations />
      )
    }
    else if (currentPage === 'donor'){
      return (
        <Donor />
      )
    }
    else if (currentPage === 'bloodrequest'){
      return (
        <Requests />
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

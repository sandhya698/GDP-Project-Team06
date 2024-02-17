import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { authenticate } from '../utils/ApiRoutes';
import { Col, Container, Row } from 'react-bootstrap';
import { Sidebar } from '../components/Sidebar';
// import Dashboard from './Dashboard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router';
// import { Donor } from './Donor';
// import { Patient } from './Patient';
// import { Donations } from './Donations';
// import { Requests } from './Requests'; 
// import Inventory from './Inventory';
// import { Error } from './Error';
// import SidebarContainer from '../components/SidebarContainer';

export const Home = () => {

  const [loading, setLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkUserAuthentication = useCallback(async () => {
    try {
      // console.log('autnentcaitng')
      const res = await axios.get(authenticate, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res.data);
      // setIsAuthenticated(true);
    }
    catch (err) {
      console.log(err.response.data);
      if (!err.response.data.status) {
        navigate('/login');
      }
    }
    finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [navigate]);

  useEffect(() => {
    checkUserAuthentication();
  }, [checkUserAuthentication]);

  
  return (
    <>
      {
        loading ?
          (
            <LoadingSpinner />
          ) :
          (
            <>
            <Container fluid> 
                <Row className="h-100"> 
                  <Sidebar />
                  <Col className='p-0'>
                    {/* <Dashboard />  */}
                  </Col>
                </Row>
              </Container>
            </>
          )
      }
    </>
  )
}

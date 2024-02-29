import React, { useCallback, useEffect, useState } from 'react'
import {  Container, Row } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStockRoute, miscStatsRoute } from '../utils/ApiRoutes';
import LoadingSpinner from '../components/LoadingSpinner';
import { AdminDashboard } from './dashboardPages/AdminDashboard';
import { DonorDashboard } from './dashboardPages/DonorDashboard';
import { PatientDashboard } from './dashboardPages/PatientDashboard';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Dashboard() {

  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState({});
  const [miscStats, setMiscStats] = useState({});

  const getStock = useCallback(async () => {
    try {
      const stockRes = await axios.get(getStockRoute, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });

      const miscStatRes = await axios.get(miscStatsRoute, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });

      setStock(stockRes.data.inventory);
      setMiscStats(miscStatRes.data.miscStats);
    }
    catch (err) {
      console.log(err.response.data);
      if (!err.response.data.success) {
        navigate('/error');
      }
    }
    finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [navigate]);

  useEffect(() => {
    // console.log(state.user.userType)
    if (user && user.userType === 'admin') {
      getStock();
    }
    // eslint-disable-next-line
  }, [getStock]);


  const DashboardManager = () => {
    if(user) {
      switch (user.userType){
        case 'admin':
          return <>
              { loading ? <LoadingSpinner /> : <AdminDashboard miscStats={miscStats} stock={stock} /> }
              </>
        case 'donor':
          return <DonorDashboard />
        case 'patient':
          return <PatientDashboard />
        default:
          return <p>Not logged in</p>
      }
    }
  }

  return (
    <>
      <Container className='p-5 d-flex flex-column ' style={{ height: '100vh', overflowY: 'auto' }} >
        <Row>
          <h3 className="text-left fs-1 mb-3 text-capitalize">Dashboard</h3>
        </Row>
        <DashboardManager />
      </Container>  
    </> 
  )
}

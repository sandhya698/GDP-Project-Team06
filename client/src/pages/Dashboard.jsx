import React, { useCallback, useEffect, useState } from 'react'
import {  Container, Row } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStockRoute, miscStatsRoute } from '../utils/ApiRoutes';
import LoadingSpinner from '../components/LoadingSpinner';
import { MiscStatsCard } from '../components/dashboard/MiscStatsCard';
import { BloodCards } from '../components/dashboard/BloodCards';

export default function Dashboard() {

  const navigate = useNavigate();

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
    getStock();
  }, [getStock]);


  return (
    <>
      {
        loading ? (
          <LoadingSpinner />
        ) :
        (
          <Container className='p-5 d-flex flex-column ' style={{ height: '100vh', overflowY: 'auto' }} >
            <Row>
              <h3 className="text-left fs-1 mb-3 text-capitalize">Dashboard</h3>
            </Row>
            <Row>
              <Row className='overview mt-3'>
                <Row xs={1} md={2} lg={5} className="g-4 mt-0">
                  <MiscStatsCard miscStats={miscStats} />
                </Row>
              </Row>
              <Row className='blood-groups my-5'>
                <Row xs={1} md={2} lg={4} className="g-4 mt-0">
                  <BloodCards stock={stock} />
                </Row>
              </Row>
            </Row>
          </Container>  
        )
      }
    </>
  )
}

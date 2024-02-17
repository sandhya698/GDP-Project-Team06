import React, { useCallback, useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStockRoute, miscStatsRoute } from '../utils/ApiRoutes';
import { dashboardList } from '../utils/dashboardIconList';
import LoadingSpinner from '../components/LoadingSpinner';

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
      if (!err.response.data.status) {
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
            <Container className='px-5 d-flex flex-column ' style={{ height: '100vh', overflowY: 'auto' }} >
              <Row className='overview mt-3'>
                <Row xs={1} md={2} lg={5} className="g-4 mt-0">
                  {
                    Object.keys(miscStats).map((data, index) => ( 
                      <Col key={index} >
                        <Card bg={dashboardList[index].bgColor} style={{height: "120px"}} className='flex-row align-items-center justify-content-around shadow'>
                          <Col sm={8} md={8}>
                            <Card.Body className='py-2'>
                              <Card.Title className="text-white fs-5">{dashboardList[index].name}</Card.Title>
                              <Card.Text>
                                <span className='fw-boldler fs-3 text-white'>{miscStats[data]}</span>
                              </Card.Text>
                            </Card.Body>
                          </Col>
                          <Col md={4}>
                          <i className={`${dashboardList[index].icon} text-white fs-1 }`}></i>
                          </Col>
                        </Card>
                      </Col>
                      )
                    )
                  }
                </Row>
              </Row>
              <Row className='blood-groups my-5'>
                <Row xs={1} md={2} lg={4} className="g-4 mt-0">
                    {
                      stock.map((data, index) => (
                        <Col key={index}>
                          <Card border='primary' className='flex-row align-items-center justify-content-around shadow' style={{ height: "120px"}}>
                            <Col sm={8} md={8}>
                              <Card.Body className='py-2'>
                                <Card.Title className="text-primary fs-1">{data.bloodGroup}</Card.Title>
                                <Card.Text>
                                  <span className='fw-boldler fs-5'>{data.quantity}ml</span> Available
                                </Card.Text>
                              </Card.Body>
                            </Col>
                            <Col md={4}>
                              <i className="fas fa-tint" style={{ color: "red", fontSize: "2.8rem"}}></i>
                            </Col>
                          </Card>
                        </Col>
                        )
                      )
                    }
                </Row>
              </Row>
            </Container>  )
      }
    </>
  )
}

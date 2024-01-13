import React, { useCallback, useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStockRoute, miscStatsRoute } from '../../utils/ApiRoutes';
import styled from 'styled-components';
import { dashboardList } from '../../utils/dashboardIconList';

export default function Dashboard() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState({});
  const [miscStats, setmiscStats] = useState({});

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
      setmiscStats(miscStatRes.data.miscStats);
      setLoading(false);
    }
    catch (err) {
      console.log(err.response.data);
      setLoading(false);
      if (!err.response.data.status) {
        navigate('/error');
      }
    }
  }, [navigate]);

  useEffect(() => {
    getStock();
  }, [getStock, navigate]);


  return (
    <>
      {
      loading ?
        (
          <p> Loading...</p>
        ) :
        (
          <>
            <Container className='h-100 px-5 d-flex flex-column'>
              <Row className='overview'>
                  <Row xs={1} md={2} lg={5} className="g-4 mt-0">
                    {
                      Object.keys(miscStats).map((data, index) => ( 
                        <Col key={index} >
                          <Card bg={dashboardList[index].bgColor} style={{height: "120px"}} className='flex-row align-items-center justify-content-around shadow'>
                            <Col md={8}>
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
                  <Row xs={1} md={2} lg={4} className="g-3 mt-0">
                      {
                        stock.map((data, index) => (
                          <Col key={index}>
                            <Card border='primary' className='flex-row align-items-center justify-content-around shadow' style={{ height: "120px"}}>
                              <Col md={8}>
                                <Card.Body className='py-2'>
                                  <Card.Title className="text-primary fs-1">{data.bloodGroup}</Card.Title>
                                  <Card.Text>
                                    <span className='fw-boldler fs-5'>{data.quantity}ml</span> Available
                                  </Card.Text>
                                </Card.Body>
                              </Col>
                              <Col md={4}>
                                <Icon>
                                  <i className="fas fa-tint"></i>
                                </Icon>
                              </Col>
                            </Card>
                          </Col>
                          )
                        )
                      }
                  </Row>
              </Row>
            </Container>
          </>
        )
      }
    </>
  )
}


const Icon = styled.div`
  color: red;
  font-size: 4rem;
`
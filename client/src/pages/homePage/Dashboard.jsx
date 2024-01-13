import React, { useCallback, useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import MyCard from '../../components/Card'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStockRoute } from '../../utils/ApiRoutes';
import styled from 'styled-components';

export default function Dashboard() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState(true);

  const getStock = useCallback(async () => {
    try {
      console.log('autnentcaitng')
      const res = await axios.get(getStockRoute, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      setStock(res.data.inventory);
      setLoading(false);
      console.log(res.data.inventory);
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
            <Container className='h-100 ps-5 d-flex flex-column'>
              <Row className='overview'>
                <MyCard count={5} rowCount={5} height={"150px"}/>
              </Row>
              <Row className='blood-groups mt-5'>
                  <Row xs={1} md={4} className="g-4 mt-0">
                      {
                        stock.map((data, index) => (
                          <Col key={index}>
                            <Card border='primary' className='flex-row align-items-center justify-content-around shadow' style={{ "height": "120px" }}>
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
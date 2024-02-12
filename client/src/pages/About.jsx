import React, { useState } from 'react'
import NavigationBar from '../components/NavigationBar'
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { developers } from '../utils/developers';

export const About = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <NavigationBar
        isAuthenticated={isAuthenticated}
      />
      <Container fluid >
        <Row className="full-height-row ">
          <Col className='mx-2 my-4'>
            <Row className="">
              <h3 className="text-center mb-3 text-capitalize">Developers</h3>
              {
                developers.map((data, index) => {
                  return (
                    <Col md={2} key={index}>
                      <Card  className='dev-card shadow gx-0'>
                        <Card.Header className='dev-header text-center' >
                          <Image src={data.img} roundedCircle />
                        </Card.Header>
                        <Card.Body className='mt-3'>
                          <Card.Title className='text-center' >{data.name}</Card.Title>
                          <Card.Text className='text-center' >{data.about}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    
                  )
                })
              }
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

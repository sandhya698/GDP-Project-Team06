import React from 'react';
import NavigationBar from '../components/NavigationBar'
import { Container, Row, Col } from 'react-bootstrap';


export default function Landing() {
  return (
    <>
      <Container fluid className='landing-page' >
        <NavigationBar /> 
        <Container className='landing-wrapper'>
          <Row  className='my-row full-height-row d-flex justify-content-start align-items-center'>
            <Col className='my-col justify-content-between' sm={8}>
              <h1 className='landing-title'>donate blood today!</h1>
              <h3 className='landing-slogan'> </h3>
              <p className='landing-qoute'>In the tapestry of humanity, your blood becomes a thread of compassion, weaving stories of survival and strength. Donate generously, for in each drop lies the power to heal and unite us in the symphony of life's resilience.</p>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}

import React from 'react';
import { Container, Row, Form, FloatingLabel, Button, Card, Col } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <>
    <NavigationBar />
    <Container className='form-container' fluid="md" >
      <Row className="d-flex justify-content-center align-items-center full-height-row">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <h2 className="fw-bold mb-2 text-uppercase">BLOOD BANK</h2>
                <p className="mb-3">Login to start Transfusion!</p>
                <Form className="mb-3">
                    
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingInput" label="Email address"  >
                      <Form.Control type="email" placeholder="name@example.com" name="email" required />
                    </FloatingLabel> 
                  </Form.Group>
                    
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingInput" label="Password" >
                      <Form.Control type="password" placeholder="secret" name="password" required />
                    </FloatingLabel> 
                  </Form.Group>

                  <div className="mb-3">
                    <p className="small">
                      <Link className="text-primary" to='#' >Forgot password?</Link>
                    </p>
                  </div>

                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Start Transfusion
                    </Button>
                  </div>
                    
                  <div className="mt-3">  
                    <p className="mb-0  text-center">
                      Do you want to become a transfuser?{" "}
                      <Link className="text-primary fw-bold" to='/register' >Register</Link>
                    </p>
                  </div>
                </Form>

              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container> 
  </>
  )
}

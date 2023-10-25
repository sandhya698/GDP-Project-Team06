import React from 'react';
import { Container, Row, Form, FloatingLabel, Button, Card, Col } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';

export const Register = () => {
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
                  <p className="mb-3">Please enter your details to join us!</p>
                  <Form className="mb-3">
                      
                    <Form.Group className="mb-3">
                      <FloatingLabel controlId="floatingInput" label="Name" >
                        <Form.Control type="text" placeholder="Dream Fuel" name="name" required />
                      </FloatingLabel> 
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <FloatingLabel controlId="floatingInput" label="Email address"  >
                        <Form.Control type="email" placeholder="name@example.com" name="email" required />
                      </FloatingLabel> 
                    </Form.Group>
                      
                    <Row className="mb-2">
                      <Form.Group className="mb-3" as={Col}>
                        <FloatingLabel controlId="floatingInput" label="Password" >
                          <Form.Control type="password" placeholder="secret" name="password" required />
                        </FloatingLabel> 
                      </Form.Group>

                      <Form.Group className="mb-3" as={Col}>
                        <FloatingLabel controlId="floatingInput" label="Confirm Password" >
                          <Form.Control type="password" placeholder="secret" name="cpassword" required />
                        </FloatingLabel> 
                      </Form.Group>
                    </Row>

                    <div className="mb-3">
                      <p className="small">
                        <a className="text-primary" href="#!">
                          Forgot password?
                        </a>
                      </p>
                    </div>

                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Register
                      </Button>
                    </div>
                      
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <a href="{''}" className="text-primary fw-bold">
                          Sign In
                        </a>
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
  );
}

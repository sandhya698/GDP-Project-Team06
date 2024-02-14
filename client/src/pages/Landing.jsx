import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar'
import { Container, Row, Form, FloatingLabel, Button, Card, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Landing() {
  const [modalShow, setModalShow] = useState(false);
  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Modal.Header className='p-0 m-0 border-0' closeButton> </Modal.Header>
          <Row className="d-flex justify-content-center align-items-center p-2">
            <h2 className="fw-bold mb-2 text-uppercase">Transfuse now</h2>
            <p className="mb-3">Login to start Transfusion!</p>
              <Card.Body>
                <Form className="mb-3" >
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="email" label="Email address"  >
                      <Form.Control className='border-2' type="email" placeholder="name@example.com" name="email"  required />
                    </FloatingLabel> 
                  </Form.Group>
                    
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="password" label="Password" >
                      <Form.Control className='border-2' type="password" placeholder="secret" name="password"  required />
                    </FloatingLabel> 
                  </Form.Group>

                  <div className="mb-3">
                    <p className="small">
                      <Link className="text-danger" to='#' >Forgot password?</Link>
                    </p>
                  </div>

                  <div className="d-grid">
                    <Button variant="danger">
                      Start Transfusion
                    </Button>
                  </div>
                    
                  <div className="mt-3">  
                    <p className="mb-0  text-center">
                      Do you want to become a transfuser?{" "}
                      <Link className="text-danger fw-bold" to='/register' >Register</Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
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
              <Button
                className='donate-button px-3 py-1'
                variant="outline-danger"
                style={{ borderRadius: 0, borderWidth: "2px" }}
                onClick={() => setModalShow(true)}>
                Donate
              </Button>
            </Col>
            <MyVerticallyCenteredModal
              show={modalShow}
              backdrop="static"
              keyboard={false}
              onHide={() => setModalShow(false)}
            />
          </Row>
        </Container>
      </Container>
    </>
  )
}

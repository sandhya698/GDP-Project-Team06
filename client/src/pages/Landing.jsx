import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar'
import { Container, Row, Button, Col, Modal } from 'react-bootstrap';
import { RegLogController } from './modals/RegLogController';


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
            <RegLogController />
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

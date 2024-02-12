import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar'
import { Container, Row, Button, Col, Modal } from 'react-bootstrap';


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
        <Modal.Header className='px-4 py-2' closeButton>
          <Modal.Title  id="contained-modal-title-vcenter">
          Modal Title
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={props.onHide}>Close</Button>
        </Modal.Footer>
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
        onHide={() => setModalShow(false)}
      />
          </Row>
        </Container>
      </Container>
    </>
  )
}

import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useGlobalState } from '../../reducer/GlobalState'

export const RequestBlood = () => {

  const {state} = useGlobalState();

  const [requestDetails, setrRquestDetails] = useState({
      name: state.user?.name, bloodGroup: '', quantity: 0, disease: ''
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      return setrRquestDetails({ ...requestDetails, [name]: value });
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(requestDetails);
    }

  return (
    <>
        <Container className='p-5 d-flex flex-column ' style={{ height: '100vh', overflowY: 'auto' }} >
        <Row>
          <h3 className="text-left fs-1 mb-3 text-capitalize">Request for blood</h3>
        </Row>
        <Row>
        <Col sm={8} md={6}>
          <Form onSubmit={handleSubmit} >
            <Form.Group as={Row} className="mb-3" controlId="name">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control disabled readOnly className='border-2' type="text" placeholder="John" value={requestDetails.name} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="disease">
              <Form.Label column sm={3}>
                Disease
              </Form.Label>
              <Col sm={9}>
                <Form.Control className='border-2' name='disease' type="text" placeholder="COVID" onChange={handleChange} required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="bloodGroup">
              <Form.Label column sm={3}>
                Blood Group
              </Form.Label>
              <Col sm={9}>
                <Form.Select className='border-2' name="bloodGroup" value={requestDetails.bloodGroup} onChange={handleChange} required>
                    <option value="">Choose...</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="quantity">
              <Form.Label column sm={3}>
                  Quantity
              </Form.Label>
              <Col sm={9}>
                <Form.Control className='border-2' min={1} type="number" placeholder="0" name="quantity" value={requestDetails.quantity} onChange={handleChange} required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 3 }}>
                <Button type="submit">Request Blood</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
        
        </Row>
      </Container>  
    </>
  )
}

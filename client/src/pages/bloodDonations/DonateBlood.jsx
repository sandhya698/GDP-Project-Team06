import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useGlobalState } from '../../reducer/GlobalState';
import { bloodDonationRoute } from '../../utils/ApiRoutes';
import axios from 'axios';

export const DonateBlood = () => {

  const {state} = useGlobalState();

  const [requestMade, setRequestMade] = useState(false);
  const [requestError, setRequestError] = useState(undefined);
  const [requestId, setRequestId] = useState('');

  const [donationDetails, setDonationDetails] = useState({
    bloodGroup: '', quantity: 0,disease: ''
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    return setDonationDetails({ ...donationDetails, [name]: value });
  }

  const api = axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { bloodGroup, quantity, disease } = donationDetails;
    try {
      const userId = state.user?._id; 
      const res = await api.post(`${bloodDonationRoute}/donate`, {
        bloodGroup, quantity, disease, userId
      });
      if (res.data.success) {
        setRequestMade(true);
        setRequestId(res.data.result);
      }
    }
    catch (error) {
      console.log("in error", error);
      setRequestError(error.response.data);
      setRequestMade(true);
    }
  };
  
  const handleRequestButton = () => {
    setRequestMade(false);
    setRequestId('');
    setRequestError(undefined);
    setDonationDetails({
      bloodGroup: '', quantity: 0, disease: ''
    });
  }

  return (
    <Container className='p-5 d-flex flex-column ' style={{ height: '100vh', overflowY: 'auto' }} >
      <Row>
        <h3 className="text-left fs-1 mb-3 text-capitalize">Donate blood</h3>
      </Row>
      <Row>
        {
          requestMade ?
            <>
              <Col sm={8} md={6}>
                {
                  !requestError ?
                    <>
                      <p className='text-success fw-bold'>Donation had made successfully.</p>
                      <p className='mb-0'>Please go to donation history section to view your status.</p>
                      <p><strong>Your donation id:</strong> {requestId}</p>
                      <Button sm={{ span: 10, offset: 3 }} onClick={handleRequestButton}>Another Donation</Button>
                    </> : 
                    <>
                      <p> <span className='text-danger fw-bold'>Error in donation: </span></p>
                      <pre id="json">{JSON.stringify(requestError, undefined, 2)}</pre>
                      <Button sm={{ span: 10, offset: 3 }} onClick={handleRequestButton}>Donate Again</Button>
                    </>
                }
                
              </Col>
            </> :
            <>
              <Col sm={8} md={6}>
                <Form onSubmit={handleSubmit} >
                  <Form.Group as={Row} className="mb-3" controlId="name">
                    <Form.Label column sm={3}>
                      Name
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control disabled readOnly className='border-2' type="text" placeholder="John" value={state.user?.name} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="disease">
                    <Form.Label column sm={3}>
                      Existing Disease
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
                      <Form.Select className='border-2' name="bloodGroup" value={donationDetails.bloodGroup} onChange={handleChange} required>
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
                      <Form.Control className='border-2' min={1} type="number" placeholder="0" name="quantity" value={donationDetails.quantity} onChange={handleChange} required />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 3 }}>
                      <Button type="submit">Donate Blood</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
            </>
        }
      </Row>
    </Container>
  )
}

import React, { useState } from 'react'
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import axios from 'axios';
import { manageStockRoute } from '../utils/ApiRoutes';
import SidebarContainer from '../components/SidebarContainer';

export default function Inventory() {

  const [inventoryDetails, setInventoryDetails] = useState({
    operation: "", quantity: 0, bloodGroup: ""
  });
  const [updatedInventory, setUpdatedInventory] = useState(null);

  const api = axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInventoryDetails({ ...inventoryDetails, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { operation, quantity, bloodGroup } = inventoryDetails;
    try {
      const res = await api.post(`${manageStockRoute}/${operation}`, { quantity, bloodGroup });
      setInventoryDetails({
        operation: "", quantity: 0, bloodGroup: ""
      });
      setUpdatedInventory(res.data.updatedInventory);
    }
    catch (error) {
      console.log(error.response.data);
    }
  }


  return (
    // <Container>
      <SidebarContainer>
      <Row className="d-flex justify-content-start align-items-center mx-2 my-5 m-md-5">
        <Col md={8} lg={8} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <h3 className="fw-bold mb-2 text-uppercase">Inventory Management</h3>
                <Form className="my-3" onSubmit={handleSubmit} >
                  <Row className="mb-2">
                    
                    <Form.Group className='mb-2' as={Col} lg={3} md={4} xs={12}>
                      <FloatingLabel controlId="operation" label="Operation"  >
                        <Form.Select name="operation" value={inventoryDetails.operation} onChange={handleChange} required>
                          <option value="">Choose...</option>
                          <option value="in">Add</option>
                          <option value="out">Reduce</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className='mb-2' as={Col} lg={3} md={4} xs={12}>
                      <FloatingLabel controlId="email" label="Quantity"  >
                        <Form.Control type="number" placeholder="0" name="quantity" value={inventoryDetails.quantity} onChange={handleChange} required />
                      </FloatingLabel> 
                    </Form.Group>

                    <Form.Group className='mb-2' as={Col} lg={3} md={4} xs={12}>
                      <FloatingLabel controlId="bloodGroup" label="Blood Group">
                        <Form.Select name="bloodGroup" value={inventoryDetails.bloodGroup} onChange={handleChange} required>
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
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className='mb-2' as={Col} lg={3} md={4} xs={12} >
                      <Col sm={{ span: 10, offset: 2 }} xs={{ span: 12 }} style={{ lineHeight: '50px' }}>
                        <Button type="submit">Update</Button>
                      </Col>
                    </Form.Group>

                  </Row>
                </Form>
                <div className="mb-3">
                  {
                    updatedInventory ? <p>Updated stock value of <span className='fw-bold'>{updatedInventory.bloodGroup}</span> Blood Group is <span className='fw-bold'>{updatedInventory.quantity}ml</span></p> : null
                  }
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        </Row>
        </SidebarContainer>
    // {/* </Container> */}
  )
}

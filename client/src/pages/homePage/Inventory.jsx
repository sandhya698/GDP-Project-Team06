import React, { useState } from 'react'
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function Inventory() {

  const [loading, setLoading] = useState(false);

  return (
    <Container>
      {
        loading ? ( <LoadingSpinner /> ) : (
          <Row className="d-flex justify-content-start align-items-center mx-2 my-5 m-md-5">
            <Col md={8} lg={8} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-4">
                  <h3 className="fw-bold mb-2 text-uppercase">Inventory Management</h3>
                    <Form className="my-3" >
                      <Row className="mb-2">
                        
                        <Form.Group className='mb-2' as={Col} lg={3} md={4} xs={12}>
                          <FloatingLabel controlId="operation" label="Operation" >
                            <Form.Select>
                              <option value="add">Add</option>
                              <option value="reduce">Reduce</option>
                            </Form.Select>
                          </FloatingLabel>
                        </Form.Group>

                        <Form.Group className='mb-2' as={Col} lg={3} md={4} xs={12}>
                          <FloatingLabel controlId="email" label="Quantity"  >
                            <Form.Control type="number" placeholder="0" name="quantity" required />
                          </FloatingLabel> 
                        </Form.Group>

                        <Form.Group className='mb-2' as={Col} lg={3} md={4} xs={12}>
                          <FloatingLabel controlId="bloodGroup" label="Blood Group" >
                            <Form.Select>
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
                            <Button type="submit">Do It!</Button>
                          </Col>
                        </Form.Group>

                      </Row>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      )
    }
  </Container>
  )
}

import React from 'react'
import { Button, Card, Form, FloatingLabel, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function LoginModal({handleUser}) {
  return (
    <>
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

              <div className="mb-3 ps-1">
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
                  <Link className="text-danger fw-bold" onClick={e => handleUser(false)} >Register</Link>
                </p>
              </div>
            </Form>
          </Card.Body>
      </Row>    
    </>
  )
}

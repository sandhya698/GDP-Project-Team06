import React, { useState } from 'react'
import { Button, Card, Form, FloatingLabel, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin';

export default function LoginModal({ handleUser }) {

  const [loginDetails, setLoginDetails] = useState({
    email: "", password: ""
  });

  const { login, isLoading } = useLogin();

  const handleChange = (event) => {
    const { name, value } = event.target;
    return setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(loginDetails);
  }

  return (
    <>
      <Row className="d-flex justify-content-center align-items-center p-2">
        <h2 className="fw-bold mb-2 text-uppercase">Transfuse now</h2>
        <p className="mb-3">Login to start Transfusion!</p>
          <Card.Body>
            <Form className="mb-3" onSubmit={handleSubmit} >
              <Form.Group className="mb-3">
                <FloatingLabel controlId="email" label="Email address"  >
                  <Form.Control className='border-2' type="email" placeholder="name@example.com" name="email" onChange={handleChange} autoFocus required />
                </FloatingLabel> 
              </Form.Group>
                
              <Form.Group className="mb-3">
                <FloatingLabel controlId="password" label="Password" >
                  <Form.Control className='border-2' type="password" placeholder="secret" name="password" onChange={handleChange} required />
                </FloatingLabel> 
              </Form.Group>

              <div className="mb-3 ps-1">
                <p className="small">
                  <Link className="text-danger" to='#' >Forgot password?</Link>
                </p>
              </div>

              <div className="d-grid">
                <Button variant="danger" type="submit" disabled={isLoading} >
                  {isLoading ? 'Logging In...' : 'Start Transfusion'}
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

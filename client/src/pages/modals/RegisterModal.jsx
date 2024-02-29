import React, { useState } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useRegister } from '../../hooks/useRegister';

export default function RegisterModal({ handleUser }) {

  const [userDetails, setUserDetails] = useState({
    name: "", email: "", password: "", cpassword: "", userType: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    return setUserDetails({ ...userDetails, [name]: value });
  }

  const { register, error, isLoading } = useRegister();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await register(userDetails);
    if (!error) {
      handleUser(true);
    }
    
  }

  return (
    <>
      <Row className="d-flex justify-content-center align-items-center">
        <h2 className="fw-bold mb-2 text-uppercase">transfuse now</h2>
        <p className="mb-3">Please enter your details to become a Transfuser!</p>
        <Form className="mb-3" onSubmit={handleSubmit}>
            
          <Form.Group className="mb-3">
            <FloatingLabel controlId="name" label="Name" >
              <Form.Control className='border-2' type="text" placeholder="Dream Fuel" name="name" onChange={handleChange} required />
            </FloatingLabel> 
          </Form.Group>

          <Row className="mb-3 align-items-center">
            <Form.Group className="mb-3" as={Col}>
              <FloatingLabel controlId="email" label="Email address"  >
                <Form.Control className='border-2' type="email" placeholder="name@example.com" name="email" onChange={handleChange}  required />
              </FloatingLabel> 
            </Form.Group>
            
            <Form.Group as={Col} controlId="userType">
              <div className="d-flex flex-column  align-items-start flex-md-row justify-content-md-around">
                <Form.Label className="text-center"> I am a </Form.Label>
                <Form.Check type="radio" value="donor" label="Donor" name="userType" id="donor"
                  checked={userDetails.userType === "donor"} onChange={handleChange} />
                <Form.Check type="radio" value="patient" label="Patient" name="userType" id="patient"
                  checked={userDetails.userType === "patient"} onChange={handleChange} />
              </div>
            </Form.Group>
          </Row>

          <Row className="mb-2">
            <Form.Group className="mb-3" as={Col}>
              <FloatingLabel controlId="password" label="Password" >
                <Form.Control className='border-2' type="password" placeholder="secret" name="password" onChange={handleChange} required />
              </FloatingLabel> 
            </Form.Group>

            <Form.Group className="mb-3" as={Col}>
              <FloatingLabel controlId="cpassword" label="Confirm Password" >
                <Form.Control className='border-2' type="password" placeholder="secret" name="cpassword" onChange={handleChange} required />
              </FloatingLabel> 
            </Form.Group>
          </Row>

          <div className="d-grid">
            <Button variant="danger" type="submit" disabled={isLoading} >
              {isLoading ? 'Registering...' : 'Become a Transfuser'}
            </Button>
          </div>
            
          <div className="mt-3">
            <p className="mb-0  text-center">
              Already a Transfuser?{" "}
              <Link className="text-danger fw-bold" onClick={e => handleUser(true)} >Login</Link>
            </p>
          </div>
        </Form>
        </Row>
    </>
  )
}

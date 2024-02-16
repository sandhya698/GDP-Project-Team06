import React, { useState } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toastOptions } from '../../utils/toasOptions';
import { toast } from 'react-toastify';
import axios from 'axios';
import { registerRoute } from '../../utils/ApiRoutes';

export default function RegisterModal({ handleUser }) {

  const [userDetails, setUserDetails] = useState({
    name: "", email: "", password: "", cpassword: "", userType: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    return setUserDetails({ ...userDetails, [name]: value });
  }

  const validateUserDetails = () => {
    const { name, email, password, cpassword, userType } = userDetails;
    console.log(userDetails);

    let validated = true;

    const nameRegex = /^[a-zA-z0-9_ ]{3,25}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*-])[a-zA-Z\d.!@#$%^&*-]{8,16}$/;

    toast.dismiss();

    if (!nameRegex.test(name)) {
      toast.error(
        "Username should be greater than 3 chars. Special chars allowed space and underscore",
        toastOptions
      );
      validated = false;
    }

    if (!emailRegex.test(email)) {
      toast.error(
        "Invalid email",
        toastOptions
      );
      validated = false;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password should be min of 8 and max 16. Should follow standard password rules",
        toastOptions
      );
    validated = false;
    }

    if (!password.match(cpassword)) {
      toast.error(
        "Passwords does not match",
        toastOptions
      );
      validated = false;
    }

    if (userType === '') {
      toast.error(
        "Who are you?",
        toastOptions
      );
      validated = false;
    }

    return validated;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, cpassword, userType } = userDetails;

    if (validateUserDetails()) {
      try {
        const res = await axios.post(registerRoute, {
          name, email, password, cpassword, userType
        });
  
        console.log(res);
        if(res.data.success) {
          toast.success('You are now a Transfuser!!', toastOptions);
          handleUser(true);
        };
      }
      catch (err) {
        console.log(err.response.data);
        toast.error(err.response.data.message, toastOptions);
      }
      
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
            <Button variant="danger" type="submit">
              Become a Transfuser
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

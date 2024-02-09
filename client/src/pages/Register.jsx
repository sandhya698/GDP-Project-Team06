import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row, Form, FloatingLabel, Button, Card, Col } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { authenticate, registerRoute } from '../utils/ApiRoutes';
import { toastOptions } from '../utils/toasOptions';

export const Register = () => {

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "", email: "", password: "", cpassword: "", userType: ""
  })

  const redirecToHome = useCallback(async () => {
    try {
      const res = await axios.get(authenticate, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      // console.log(res.data);
      if (res.data.status) {
        navigate('/');
      }
    }
    catch (err) {
      console.log(err.response.data);
    }
  }, [navigate]);

  useEffect(() => {
    redirecToHome();
  }, [redirecToHome]);

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
        toast.success('You are now a Transfuser!!', toastOptions);
        navigate('/login');
      }
      catch (err) {
        // console.log(err.response);
        // window.alert(err.response.data.message);
        toast.error(err.response.data.message, toastOptions);
      }
      
		}
  }

  return (
    <>
      <NavigationBar />
      <Container className='form-container' fluid="md" >
        <Row className="d-flex justify-content-center align-items-center full-height-row">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-4">
                  <h2 className="fw-bold mb-2 text-uppercase">BLOOD BANK</h2>
                  <p className="mb-3">Please enter your details to become a Transfuser!</p>
                  <Form className="mb-3" onSubmit={handleSubmit}>
                      
                    <Form.Group className="mb-3">
                      <FloatingLabel controlId="name" label="Name" >
                        <Form.Control type="text" placeholder="Dream Fuel" name="name" onChange={handleChange} required />
                      </FloatingLabel> 
                    </Form.Group>

                    <Row className="mb-3 align-items-center">
                      <Form.Group className="mb-3" as={Col}>
                        <FloatingLabel controlId="email" label="Email address"  >
                          <Form.Control type="email" placeholder="name@example.com" name="email" onChange={handleChange} required />
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
                          <Form.Control type="password" placeholder="secret" name="password" onChange={handleChange} required />
                        </FloatingLabel> 
                      </Form.Group>

                      <Form.Group className="mb-3" as={Col}>
                        <FloatingLabel controlId="cpassword" label="Confirm Password" >
                          <Form.Control type="password" placeholder="secret" name="cpassword" onChange={handleChange} required />
                        </FloatingLabel> 
                      </Form.Group>
                    </Row>

                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Become a Transfuser
                      </Button>
                    </div>
                      
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already a Transfuser?{" "}
                        <Link className="text-primary fw-bold" to='/login' >Login</Link>
                      </p>
                    </div>
                  </Form>

                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> 
      <ToastContainer />
    </>
  );
}

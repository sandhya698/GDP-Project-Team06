import React, { useState } from 'react'
import { Button, Card, Form, FloatingLabel, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { toastOptions } from '../../utils/toasOptions';
import axios from 'axios';
import { loginRoute } from '../../utils/ApiRoutes';
import { useGlobalState } from '../../reducer/GlobalState';

export default function LoginModal({ handleUser }) {

  const navigate = useNavigate();
  const { dispatch } = useGlobalState();

  const [loginDetails, setLoginDetails] = useState({
    email: "", password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    return setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('in handle submit')
    const { email, password } = loginDetails;

    if (!email || !password) {
      toast.error("email and password are required", toastOptions);
    }
    else {
      try {
        const res = await axios.post(loginRoute,
          { email, password },
          { withCredentials: true }
        );
        
        // console.log(res);
        if (res.data.success) {
          toast.success('Successfully logged In', toastOptions);
          dispatch({ type: 'SET_USER', payload: res.data.loginUser });
          dispatch({ type: 'SET_TOKEN', payload: res.data.token });
          navigate('/dashboard');
        }
        
      }
      catch (err) {
        console.log(err.response.data);
        toast.error(err.response.data.message, toastOptions);
        // window.alert(err.response.data.message);
      }
    }
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
                  <Form.Control className='border-2' type="email" placeholder="name@example.com" name="email" onChange={handleChange} required />
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
                <Button variant="danger" type="submit">
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

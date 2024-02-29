import React from 'react';
import { NavLink } from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';
import { Logout } from './Logout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function NavigationBar() {
  
  const { user } = useAuthContext();

  const LoginLogout = () => {
    if (user) {
      return (
        <>
          <Navbar.Text className="nav-link d-flex flex-row text-capitalize"><span className="fas fa-user me-2 fs-5"></span> {user.userType}</Navbar.Text>
          <Navbar.Text className='fw-bold'>{user.name}</Navbar.Text>
          <Logout />
        </>
      )
    }
    else {
      return (
        <>
          <NavLink className="nav-link" to="/register">Register</NavLink>
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </>
      )
    }
  }
  
  return (
    <>
      <Navbar className='my-navbar' collapseOnSelect expand="md" sticky="top">
      <Container fluid className='mx-3' >
        <Navbar.Brand as={NavLink} to='/' className='fw-bold'>Transfuse Now</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavLink className="nav-link" to="/about">About</NavLink>
            <NavLink className="nav-link" to="/faq">FAQ</NavLink>
          </Nav>
          <Nav className='ms-auto'>
            <LoginLogout />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

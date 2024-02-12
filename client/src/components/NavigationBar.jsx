import React from 'react';
import { NavLink } from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';
import { Logout } from './Logout';

export default function NavigationBar({isAuthenticated, userId}) {

  const LoginLogout = () => {
    if (isAuthenticated) {
      return (
        <>
          <Logout userId={userId} />
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
      <Container>
        <Navbar.Brand as={NavLink} to='/' className='fw-bold'>Transfuse Now</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavLink className="nav-link" to="/about">About</NavLink>
            <NavLink className="nav-link" to="/faq">FAQ</NavLink>
            <LoginLogout />  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

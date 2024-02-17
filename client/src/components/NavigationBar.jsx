import React from 'react';
import { NavLink } from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';
import { Logout } from './Logout';
import { useGlobalState } from '../reducer/GlobalState';

export default function NavigationBar({ userId }) {
  
  const { state } = useGlobalState();

  const LoginLogout = () => {
    if (state.user) {
      return (
        <>
          <NavLink  className="nav-link d-flex flex-row text-capitalize" disabled><span className="fas fa-user me-2 fs-5"></span> {state.user.userType}</NavLink>
          <NavLink className="nav-link fw-bold">{state.user.name}</NavLink>
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

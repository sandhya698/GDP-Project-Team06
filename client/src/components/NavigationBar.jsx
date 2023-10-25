import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';

export default function NavigationBar() {
  
  return (
    <>
      <Navbar collapseOnSelect expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Transfuse Now</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#deets">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="#pricing">Register</Nav.Link>  
            <Nav.Link href="#pricing">Logout</Nav.Link>  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

import React from 'react'
import { Container, Spinner } from 'react-bootstrap';

export default function LoadingSpinner() {
  return (
    <Container className='d-flex justify-content-center align-items-center h-100'>
      <Spinner animation="border" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};
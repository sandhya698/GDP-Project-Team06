import React from 'react'
import { Container, Row } from 'react-bootstrap'
import MyCard from '../Card'

export default function Dashboard() {
  return (
    <Container className='h-100 ps-5 d-flex flex-column justify-content-around'>
      <Row className='overview'>
        <MyCard count={5} rowCount={5} height={"150px"}/>
      </Row>
      <Row className='blood-groups'>
        <MyCard count={8} rowCount={4} height={"120px"}/>
      </Row>
    </Container>
  )
}

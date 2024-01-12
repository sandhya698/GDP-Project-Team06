import React from 'react'
import { Container, Row } from 'react-bootstrap'
import MyCard from '../Card'

export default function Dashboard() {
  return (
    <Container className='h-100 ps-5 d-flex flex-column justify-content-around'>
      <Row className='overview'>
        <MyCard count={4} height={"120px"}/>
      </Row>
      <Row className='blood-groups'>
        <MyCard count={8} height={"150px"}/>
      </Row>
    </Container>
  )
}

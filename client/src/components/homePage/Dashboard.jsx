import React from 'react'
import { Container, Row } from 'react-bootstrap'
import MyCard from '../Card'

export default function Dashboard() {
  return (
    <Container className=''>
      <Row className='blood-groups'>
         <MyCard />
      </Row>
    </Container>
  )
}

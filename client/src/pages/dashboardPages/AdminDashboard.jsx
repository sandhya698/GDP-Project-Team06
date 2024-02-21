import React from 'react'
import { Row } from 'react-bootstrap'
import { MiscStatsCard } from '../../components/dashboard/MiscStatsCard'
import { BloodCards } from '../../components/dashboard/BloodCards'

export const AdminDashboard = ({miscStats, stock}) => {
  return (
    <>
        <Row>
            <Row className='overview mt-3'>
            <Row xs={1} md={2} lg={5} className="g-4 mt-0">
                <MiscStatsCard miscStats={miscStats} />
            </Row>
            </Row>
            <Row className='blood-groups my-5'>
            <Row xs={1} md={2} lg={4} className="g-4 mt-0">
                <BloodCards stock={stock} />
            </Row>
            </Row>
        </Row>
    </>
  )
}

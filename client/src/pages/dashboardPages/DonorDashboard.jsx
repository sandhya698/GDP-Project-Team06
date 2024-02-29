import React, { useCallback, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import { userDashboardRoute } from '../../utils/ApiRoutes';
import LoadingSpinner from '../../components/LoadingSpinner';
import { DonorCarousel } from '../../components/DonorCarousel';

export const DonorDashboard = () => {

  const { user } = useAuthContext();
  const [dashboardData, setDashboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardStats = useCallback(async () => {
    const { bloodGroup, _id, userType } = user;
    setIsLoading(true);
    try {
      const { data } = await axios.get(userDashboardRoute, { params: { user: _id, bloodGroup, userType } }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });

      setDashboardData({ ...data.userStats, totalCount: data.userStats.donorReqRej + data.userStats.donorReqAcc + data.userStats.donorReqPend });
      console.log(dashboardData);
    }
    catch (error) {
        console.log(error.response)
    }
    finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    getDashboardStats();
  }, [getDashboardStats])

  return (
    <>
      {
        isLoading ? <LoadingSpinner /> :
       
          <Row className='donor-dash h-100' >
            <Row>
              <div className='fs-2 fw-bold text-center text-capitalize'>you may have have saved <span className='text-danger'>{dashboardData.livesSaved}</span> lives</div>
            </Row>
            <Row>
              <Col md={6}>
                <Row className='align-items-center gap-3'>
                  <Col md={{ span: 6, offset: 3 }} className=' text-center bg-white '>
                    <div>
                      <span className='text-success' style={{ fontSize: '5rem' }}>{dashboardData.donorReqAcc}/{dashboardData.totalCount}</span><br />
                      <span className='fs-3 fw-semibold'>Accepted</span>
                    </div>
                  </Col>
                  <Col className=' text-center  bg-white '>
                    <div>
                      <span className='text-warning' style={{ fontSize: '5rem' }}>{dashboardData.donorReqPend}/{dashboardData.totalCount}</span><br />
                      <span className='fs-3 fw-semibold'>Pending</span>
                    </div>
                  </Col>
                  <Col className=' text-center  bg-white '>
                    <div>
                      <span className='text-secondary' style={{ fontSize: '5rem' }}>{dashboardData.donorReqRej}/{dashboardData.totalCount}</span><br />
                      <span className='fs-3 fw-semibold'>Rejected</span>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <DonorCarousel />
              </Col>
            </Row>
            <Row>
              <div className='text-capitalize fs-2 fw- text-center text-danger'>thank you for your kind gesture</div>
            </Row>
          </Row>
      }
    </>
  )
}
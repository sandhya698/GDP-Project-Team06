import React, { useCallback, useEffect, useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import axios from 'axios';
import { userDashboardRoute } from '../../utils/ApiRoutes';
import { useAuthContext } from '../../hooks/useAuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import oBlood from '../../assets/oBlood.png'
import aBlood from '../../assets/aBlood.png'
import bBlood from '../../assets/bBlood.png'
import abBlood from '../../assets/abBlood.png'

export const PatientDashboard = () => {

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

      setDashboardData(data.userStats);
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
      
          <Row className='patient-dash h-100' >
            <Col md={8}>
              <div className='h-75 img-container text-center patient-img'>
                {
                  user.bloodGroup === 'A+' || user.bloodGroup === 'A-' ? <Image src={aBlood} /> :
                    user.bloodGroup === 'B+' || user.bloodGroup === 'B-' ? <Image src={bBlood} /> :
                      user.bloodGroup === 'AB+' || user.bloodGroup === 'AB-' ? <Image src={abBlood} /> :
                        <Image src={oBlood} />
                }
                <div className='text-on-image'>
                  <p className='m-0'><span className='unit-count'>{dashboardData.accepted}</span>Units<br /> Transfused</p>
                </div>
              </div>
              <div className='h-auto text-center fs-2'><span className='fw-bold text-danger'>{dashboardData.pending}</span> requests are yet to confirm</div>
              <div className='h-auto text-center text-capitalize fw-bold fs-1 text-danger'>we hope for your safer health</div>
            </Col>
            <Col md={4}>
              {
                dashboardData.recentTransfusers && dashboardData.recentTransfusers.length > 0 ? (
                  <>
                    <h3>Recently donated persons....</h3>
                    <br />
                    {
                      dashboardData.recentTransfusers.map((item, index) => {
                        return (
                          <p key={index} className='fs-4'>{item}</p>
                        )
                      })
                    }
                  </>
                ) : null
              }
            </Col>
          </Row>
      }
    </>
  )
}

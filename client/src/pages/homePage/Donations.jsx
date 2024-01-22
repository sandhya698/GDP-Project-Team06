import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { donationReqHeaders } from '../../utils/tableHeaders/donationsReqHeaders';
import axios from 'axios';
import { donationsListRoute } from '../../utils/ApiRoutes';
import { Container } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';
import ReactTable from '../../components/ReactTable';

export const Donations = () => {

  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const getDonations = useCallback ( async () => {
    try {
      const res = await api.get(donationsListRoute);

      if (res.data.success) {
        setDonations(res.data.donationsList);
      }
    }
    catch (err) {
      console.log(err.response);
      if (!err.response.data.success) {
        navigate('/error');
      }
    }
    finally {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [navigate])

  useEffect(() => {
    getDonations();
  }, [getDonations, navigate]);

  return (
    <Container className="h-100">
      {
        loading ? (
          <LoadingSpinner />
        ) : (
          <ReactTable
              title={'Donations made so far...'}
              pageSize={8}
              data={donations}
              columns={donationReqHeaders}
            />
        )
      }
    </Container>
  )
}

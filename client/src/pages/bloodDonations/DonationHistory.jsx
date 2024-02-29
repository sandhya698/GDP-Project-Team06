import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { historyHeaders } from '../../utils/tableHeaders/historyHeaders';
import { bloodDonationsHistoryRoute } from '../../utils/ApiRoutes';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Container, Row } from 'react-bootstrap';
import ReactTable from '../../components/ReactTable';
import { toast } from 'react-toastify';
import { refreshToastOptions } from '../../utils/toasOptions';
import { useAuthContext } from '../../hooks/useAuthContext';

export const DonationHistory = () => {

  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [donations, setDonations] = useState([]);

  const api = axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const getDonationsHistory = useCallback( async () => {
    try {
      let userId = user?._id; 
      const res = await api.get(`${bloodDonationsHistoryRoute}/${userId}`);

      if (res.data.success) {
        setDonations(res.data.donationsList);
        console.log(donations);
      }
    }
    catch (err) {
      console.log(err.response);
      if (!err.response.data.success) {
        // navigate('/error');
      }
    }
    finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    getDonationsHistory();
  }, [getDonationsHistory]);

  const refreshTable = () => {
    getDonationsHistory();
    toast.success('donations history refreshed', refreshToastOptions);
  }

  return (
    <>
      { loading ? (
        <LoadingSpinner />
      ) : (
        <Container className='p-5 d-flex flex-column ' style={{ height: '100vh', overflowY: 'auto' }} >
          <Row>
            <h3 className="text-left fs-1 mb-3 text-capitalize">Donations History</h3>
          </Row>
          <Row>
            <ReactTable
              pageSize={8}
              data={donations}
              columns={historyHeaders}
              refreshTable={refreshTable}
            />
          </Row>
        </Container>  
      )}
    </>
  )
}

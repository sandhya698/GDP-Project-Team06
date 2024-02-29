import React, { useCallback, useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import LoadingSpinner from '../../components/LoadingSpinner';
import ReactTable from '../../components/ReactTable';
import { historyHeaders } from '../../utils/tableHeaders/historyHeaders';
import axios from 'axios';
import { bloodRequestHistoryRoute } from '../../utils/ApiRoutes';
import { useGlobalState } from '../../reducer/GlobalState';
import { toast } from 'react-toastify';
import { refreshToastOptions } from '../../utils/toasOptions';

export const RequestHistory = () => {

  const { state } = useGlobalState();

  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  const api = axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const getRequestsHistory = useCallback( async () => {
    try {
      let userId = state.user?._id;
      const res = await api.get(`${bloodRequestHistoryRoute}/${userId}`);

      if (res.data.success) {
        setRequests(res.data.requestsList);
        console.log(requests);
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
    getRequestsHistory();
  }, [getRequestsHistory]);

  const refreshTable = () => {
    getRequestsHistory();
    toast.success('requests history refreshed', refreshToastOptions);
  }
  

  return (
    <>
      { loading ? (
        <LoadingSpinner />
      ) : (
        <Container className='p-5 d-flex flex-column ' style={{ height: '100vh', overflowY: 'auto' }} >
          <Row>
            <h3 className="text-left fs-1 mb-3 text-capitalize">Request History</h3>
          </Row>
          <Row>
            <ReactTable
              pageSize={8}
              data={requests}
              columns={historyHeaders}
              refreshTable={refreshTable}
            />
          </Row>
        </Container>  
      )}
    </>
  )
}

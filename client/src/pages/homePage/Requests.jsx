import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { donationReqHeaders } from '../../utils/tableHeaders/donationsReqHeaders';
import axios from 'axios';
import { requestsListRoute } from '../../utils/ApiRoutes';
import { Button, Container } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';
import ReactTable from '../../components/ReactTable';

export const Requests = () => {

  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState(donationReqHeaders);

  const api = axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const getDonations = useCallback ( async () => {
    try {
      const res = await api.get(requestsListRoute);

      if (res.data.success) {
        setRequests(res.data.requestsList);
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

  useEffect(() => {
    setColumns([...donationReqHeaders,{
      dataField: "Actions",
      isDummyField: true,
      text: "Actions",
      headerStyle: {
        backgroundColor: "#DEDADA",
        width: '10%'
      },
      formatter: (cell, row) => {
        return (  <>
          <Button
            variant={row.status === 'rejected' ? 'success' : 'danger'}
            size="sm">
            {row.status === 'rejected' ? 'Accept' : 'Reject'}
          </Button>
        </>
      )}
    }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="h-100">
      {
        loading ? (
          <LoadingSpinner />
        ) : (
          <ReactTable
              title={'transfusers waiting for Transfusion'}
              pageSize={8}
              data={requests}
              columns={columns}
            />
        )
      }
    </Container>
  )
}

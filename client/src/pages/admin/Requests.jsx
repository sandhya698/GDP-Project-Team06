import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { donationReqHeaders } from '../../utils/tableHeaders/donationsReqHeaders';
import axios from 'axios';
import { adminControllerRoute, requestsListRoute } from '../../utils/ApiRoutes';
import { Button, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';
import ReactTable from '../../components/ReactTable';
import { toast } from 'react-toastify';
import { refreshToastOptions, toastOptions } from '../../utils/toasOptions';

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
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    // eslint-disable-next-line
  }, [navigate])

  useEffect(() => {
    getDonations();
  }, [getDonations]);

  const updateStatus = async (row, status) => {
    const { _id, bloodGroup, userType, quantity } = row;
    try {
      status = status === 'Accept' ? 'accepted' : 'rejected';
      let route = `${adminControllerRoute}/${userType}/request/${status}`;
      const res = await api.post(route, {
        id: _id, quantity, bloodGroup
      });
      if (res.data.success === true) {
        setRequests((prevDonorList) => {
          return prevDonorList.map((request) => {
            if (request._id === _id) {
              return { ...request, status };
            }
            return request;
          });
        });
      };
    }
    catch (error) {
      // console.log(error.response.data);
      toast.error(error.response.data.message, toastOptions);
    }
  }

  useEffect(() => {
    setColumns([...donationReqHeaders,{
      dataField: "Actions",
      isDummyField: true,
      text: "Actions",
      headerStyle: {
        backgroundColor: "#DEDADA",
        width: '10rem'
      },
      formatter: (cell, row) => {
        return (  <>
          <Button
            onClick={(e) => updateStatus(row, e.currentTarget.innerText)}
            variant={row.status === 'rejected' ? 'success' : 'danger'}
            size="sm">
            {row.status === 'rejected' ? 'Accept' : 'Reject'}
          </Button>
          <Button
            className='ms-3'
            onClick={(e) => updateStatus(row, e.currentTarget.innerText)}
            variant={row.status === 'pending' ? 'success' : null}
            size="sm">
            {row.status === 'pending' ? 'Accept' : null}
          </Button>
        </>
      )}
    }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donationReqHeaders]);

  const refreshTable = () => {
    getDonations();
    toast.success('requests history refreshed', refreshToastOptions);
  }

  return (
    <>
      { loading ? (
        <LoadingSpinner />
      ) : (
        <Container className='p-5 d-flex flex-column ' style={{ height: '100vh', overflowY: 'auto' }} >
          <Row>
            <h3 className="text-left fs-1 mb-3 text-capitalize">transfusers waiting for Transfusion</h3>
          </Row>
          <Row>
            <ReactTable
              pageSize={8}
              data={requests}
              columns={columns}
              refreshTable={refreshTable}
            />
          </Row>
        </Container>  
      )}
    </>
  )
}

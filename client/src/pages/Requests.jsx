import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { donationReqHeaders } from '../utils/tableHeaders/donationsReqHeaders';
import axios from 'axios';
import { adminControllerRoute, requestsListRoute } from '../utils/ApiRoutes';
import { Button } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import ReactTable from '../components/ReactTable';
import { toast } from 'react-toastify';
import { toastOptions } from '../utils/toasOptions';
import SidebarContainer from '../components/SidebarContainer';

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
  }, [getDonations]);

  const updateStatus = async (row) => {
    const { _id, bloodGroup, userType, quantity, status } = row;
    try {
      let newStatus = status === 'rejected' ? 'accepted' : 'rejected';
      let route = `${adminControllerRoute}/${userType}/request/${newStatus}`;
      const res = await api.post(route, {
        id: _id, quantity, bloodGroup
      });
      if (res.data.success === true) {
        setRequests((prevDonorList) => {
          return prevDonorList.map((request) => {
            if (request._id === _id) {
              return { ...request, status: newStatus };
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
            onClick={() => updateStatus(row)}
            variant={row.status === 'rejected' ? 'success' : 'danger'}
            size="sm">
            {row.status === 'rejected' ? 'Accept' : 'Reject'}
          </Button>
          <Button
            className='ms-3'
            onClick={() => updateStatus(row._id, row.bloodGroup, row.quantity, row.status)}
            variant={row.status === 'pending' ? 'success' : null}
            size="sm">
            {row.status === 'pending' ? 'Accept' : null}
          </Button>
        </>
      )}
    }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donationReqHeaders]);

  return (
    <SidebarContainer>
      { loading ? (
        <LoadingSpinner />
      ) : (
        <ReactTable
            title={'transfusers waiting for Transfusion'}
            pageSize={8}
            data={requests}
            columns={columns}
          />
      )}
    </SidebarContainer>
  )
}
